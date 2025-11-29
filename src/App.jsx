import { useState, useEffect } from 'react'
import Door from './components/Door'
import DoorModal from './components/DoorModal'
import { getDoors } from './data/doors'
import './App.css'

function App() {
  const [doors, setDoors] = useState(() => {
    const saved = localStorage.getItem('adventDoors2025')
    if (saved) {
      const openedDoors = JSON.parse(saved)
      return getDoors().map(door => ({
        ...door,
        isOpen: openedDoors.includes(door.number)
      }))
    }
    return getDoors()
  })
  const [selectedDoor, setSelectedDoor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() // 0-based
  const currentDay = today.getDate()
  
  const todaysDoor = (currentYear === 2025 && currentMonth === 11 && currentDay >= 1 && currentDay <= 24) ? currentDay : null

  useEffect(() => {
    const openedDoors = doors.filter(door => door.isOpen).map(door => door.number)
    localStorage.setItem('adventDoors2025', JSON.stringify(openedDoors))
  }, [doors])

  const handleDoorClick = (doorNumber) => {
    const door = doors.find(d => d.number === doorNumber)
    if (door && !door.isOpen) {
      // Animate door opening
      setTimeout(() => {
        setDoors(prevDoors =>
          prevDoors.map(d =>
            d.number === doorNumber ? { ...d, isOpen: true } : d
          )
        )
        setSelectedDoor(door)
        setIsModalOpen(true)
      }, 600) // Wait for animation to complete
    } else if (door && door.isOpen) {
      setSelectedDoor(door)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDoor(null)
  }

  return (
    <div className="app">
      <div className="app-background">
        <div className="snowflakes">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}>❄</div>
          ))}
        </div>
      </div>
      
      <header className="header">
        <div className="header-top">
          <div className="date-info">
            <span className="current-date">{today.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            {todaysDoor && (
              <span className="todays-door">Today's Door: {todaysDoor}</span>
            )}
          </div>
          <button className="info-button" onClick={() => setIsInfoOpen(true)}>
            ℹ️
          </button>
        </div>
        <h1 className="title">
          <span className="title-icon">🎄</span>
          Advent Calendar {currentYear}
          <span className="title-icon">🎄</span>
        </h1>
        <p className="subtitle">Click on a door to reveal the surprise!</p>
      </header>

      <main className="calendar-container">
        <div className="calendar-grid">
          {doors.map((door) => (
            <Door
              key={door.number}
              door={door}
              onClick={() => handleDoorClick(door.number)}
            />
          ))}
        </div>
      </main>

      {isModalOpen && selectedDoor && (
        <DoorModal
          door={selectedDoor}
          onClose={closeModal}
          year={currentYear}
        />
      )}

      {isInfoOpen && (
        <div className="info-modal-overlay" onClick={() => setIsInfoOpen(false)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="info-close" onClick={() => setIsInfoOpen(false)}>×</button>
            <h3>What is an Advent Calendar?</h3>
            <p>An Advent Calendar is a special calendar used to count down the days of Advent, the four weeks leading up to Christmas. Traditionally, each day features a small gift, chocolate, or message.</p>
            <p>This digital version brings the magic to your screen! Click on each door to reveal festive surprises, characters, and messages leading up to Christmas Day.</p>
            <p>The calendar runs from December 1st to December 24th, 2025. Your progress is saved automatically.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

