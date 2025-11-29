import { useState } from 'react'
import Door from './components/Door'
import DoorModal from './components/DoorModal'
import { getDoors } from './data/doors'
import './App.css'

function App() {
  const [doors, setDoors] = useState(getDoors())
  const [selectedDoor, setSelectedDoor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <h1 className="title">
          <span className="title-icon">🎄</span>
          Advent Calendar 2025
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
        />
      )}
    </div>
  )
}

export default App

