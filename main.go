package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/key"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

const (
	width  = 80
	height = 24
)

var (
	// Colors and styles
	doorStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(lipgloss.Color("62")).
			Padding(1, 2).
			Width(10).
			Height(4).
			Align(lipgloss.Center)

	selectedDoorStyle = lipgloss.NewStyle().
				Border(lipgloss.RoundedBorder()).
				BorderForeground(lipgloss.Color("212")).
				Foreground(lipgloss.Color("212")).
				Padding(1, 2).
				Width(10).
				Height(4).
				Align(lipgloss.Center)

	openedDoorStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(lipgloss.Color("40")).
			Foreground(lipgloss.Color("40")).
			Padding(1, 2).
			Width(10).
			Height(4).
			Align(lipgloss.Center)

	titleStyle = lipgloss.NewStyle().
			Foreground(lipgloss.Color("212")).
			Bold(true).
			Align(lipgloss.Center).
			Margin(1, 0)

	messageStyle = lipgloss.NewStyle().
			Foreground(lipgloss.Color("252")).
			Align(lipgloss.Center).
			Margin(1, 0)
)

type model struct {
	doors       [24]door
	selected    int
	opening     int
	openingAnim int
	message     string
	showMessage bool
	width       int
	height      int
}

type door struct {
	number    int
	isOpen    bool
	character string
	message   string
}

type tickMsg time.Time

func initialModel() model {
	m := model{
		doors:       [24]door{},
		selected:    0,
		opening:     -1,
		openingAnim: 0,
		message:     "",
		showMessage: false,
		width:       width,
		height:      height,
	}

	// Initialize doors with characters and messages
	characters := getCharacters()
	messages := getMessages()

	for i := 0; i < 24; i++ {
		m.doors[i] = door{
			number:    i + 1,
			isOpen:    false,
			character: characters[i],
			message:   messages[i],
		}
	}

	return m
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
		return m, nil

	case tea.KeyMsg:
		switch {
		case key.Matches(msg, keys.Quit):
			return m, tea.Quit

		case key.Matches(msg, keys.Up):
			if m.selected >= 6 {
				m.selected -= 6
			}

		case key.Matches(msg, keys.Down):
			if m.selected < 18 {
				m.selected += 6
			}

		case key.Matches(msg, keys.Left):
			if m.selected > 0 {
				m.selected--
			}

		case key.Matches(msg, keys.Right):
			if m.selected < 23 {
				m.selected++
			}

		case key.Matches(msg, keys.Enter):
			if !m.doors[m.selected].isOpen && m.opening == -1 {
				m.opening = m.selected
				m.openingAnim = 0
				m.showMessage = false
				return m, tickCmd()
			}

		case key.Matches(msg, keys.Back):
			m.showMessage = false
			return m, nil
		}

	case tickMsg:
		if m.opening != -1 {
			m.openingAnim++
			if m.openingAnim >= 10 {
				m.doors[m.opening].isOpen = true
				m.message = m.doors[m.opening].message
				m.showMessage = true
				m.opening = -1
				m.openingAnim = 0
				return m, nil
			}
			return m, tickCmd()
		}
	}

	return m, nil
}

func (m model) View() string {
	if m.showMessage {
		return m.renderMessage()
	}

	var s strings.Builder

	// Title
	title := titleStyle.Render("* * * ADVENT CALENDAR 2024 * * *")
	s.WriteString(title)
	s.WriteString("\n\n")

	// Calendar grid (4 rows x 6 columns)
	for row := 0; row < 4; row++ {
		var rowBuilder strings.Builder
		for col := 0; col < 6; col++ {
			idx := row*6 + col
			if idx >= 24 {
				break
			}

			door := m.doors[idx]
			doorView := m.renderDoor(door, idx == m.selected, idx == m.opening)

			if col > 0 {
				rowBuilder.WriteString("  ")
			}
			rowBuilder.WriteString(doorView)
		}
		s.WriteString(rowBuilder.String())
		s.WriteString("\n\n")
	}

	// Instructions
	instructions := messageStyle.Render(
		"↑↓←→ Navigate  |  Enter: Open Door  |  Esc: Quit",
	)
	s.WriteString(instructions)

	return lipgloss.Place(
		m.width, m.height,
		lipgloss.Center, lipgloss.Center,
		s.String(),
	)
}

func (m model) renderDoor(d door, selected bool, opening bool) string {
	var content string

	if opening {
		// Animation: show opening effect
		frames := []string{
			"┌─────┐\n│  ?  │\n└─────┘",
			"┌─────┐\n│  ?  │\n└─────┘",
			"┌─────┐\n│  ?  │\n└─────┘",
			"┌─────┐\n│  ?  │\n└─────┘",
			"┌─────┐\n│  ?  │\n└─────┘",
		}
		animFrame := m.openingAnim % len(frames)
		content = frames[animFrame]
	} else if d.isOpen {
		// Show character when opened
		content = d.character
	} else {
		// Closed door
		content = fmt.Sprintf("┌─────┐\n│  %2d  │\n└─────┘", d.number)
	}

	if opening {
		return doorStyle.Copy().
			BorderForeground(lipgloss.Color("220")).
			Render(content)
	} else if d.isOpen {
		return openedDoorStyle.Render(content)
	} else if selected {
		return selectedDoorStyle.Render(content)
	} else {
		return doorStyle.Render(content)
	}
}

func (m model) renderMessage() string {
	var s strings.Builder

	door := m.doors[m.selected]
	title := titleStyle.Render(fmt.Sprintf("* * * Day %d * * *", door.number))
	s.WriteString(title)
	s.WriteString("\n\n")

	// Character display
	charBox := lipgloss.NewStyle().
		Border(lipgloss.RoundedBorder()).
		BorderForeground(lipgloss.Color("212")).
		Padding(1, 2).
		Align(lipgloss.Center).
		Render(door.character)

	s.WriteString(charBox)
	s.WriteString("\n\n")

	// Message
	msg := messageStyle.Copy().
		Width(60).
		Render(door.message)
	s.WriteString(msg)
	s.WriteString("\n\n")

	// Instructions
	instructions := messageStyle.Render("Press Backspace to return to calendar")
	s.WriteString(instructions)

	return lipgloss.Place(
		m.width, m.height,
		lipgloss.Center, lipgloss.Center,
		s.String(),
	)
}

func tickCmd() tea.Cmd {
	return tea.Tick(time.Millisecond*150, func(t time.Time) tea.Msg {
		return tickMsg(t)
	})
}

// Key bindings
type keyMap struct {
	Up     key.Binding
	Down   key.Binding
	Left   key.Binding
	Right  key.Binding
	Enter  key.Binding
	Back   key.Binding
	Quit   key.Binding
}

var keys = keyMap{
	Up: key.NewBinding(
		key.WithKeys("up", "k"),
		key.WithHelp("↑/k", "move up"),
	),
	Down: key.NewBinding(
		key.WithKeys("down", "j"),
		key.WithHelp("↓/j", "move down"),
	),
	Left: key.NewBinding(
		key.WithKeys("left", "h"),
		key.WithHelp("←/h", "move left"),
	),
	Right: key.NewBinding(
		key.WithKeys("right", "l"),
		key.WithHelp("→/l", "move right"),
	),
	Enter: key.NewBinding(
		key.WithKeys("enter"),
		key.WithHelp("enter", "open door"),
	),
	Back: key.NewBinding(
		key.WithKeys("backspace"),
		key.WithHelp("backspace", "go back"),
	),
	Quit: key.NewBinding(
		key.WithKeys("q", "esc", "ctrl+c"),
		key.WithHelp("q/esc", "quit"),
	),
}

func main() {
	rand.Seed(time.Now().UnixNano())

	p := tea.NewProgram(initialModel(), tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		fmt.Printf("Error: %v", err)
	}
}

