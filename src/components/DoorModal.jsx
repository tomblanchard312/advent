import { motion, AnimatePresence } from 'framer-motion'
import Character from './Character'
import './DoorModal.css'

function DoorModal({ door, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button className="modal-close" onClick={onClose}>×</button>
          
          <motion.div
            className="modal-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Day {door.number} — Advent 2025</h2>
          </motion.div>

          <motion.div
            className="modal-character"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Character type={door.characterType} />
          </motion.div>

          <motion.div
            className="modal-message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>{door.message}</p>
          </motion.div>

          <motion.div
            className="modal-confetti"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti-piece"
                initial={{ y: -30, x: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  y: [0, 220 + Math.random() * 40],
                  x: [0, Math.random() * 220 - 110],
                  opacity: [1, 0.8, 0],
                  rotate: [0, 180 + Math.random() * 180],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2.2,
                  delay: 0.6 + i * 0.04,
                  ease: "easeOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94', '#FFD700', '#DC143C', '#43A047'][Math.floor(Math.random() * 8)]
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DoorModal

