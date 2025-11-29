import { motion } from 'framer-motion'
import './Door.css'

const characterEmojis = {
  star: '⭐',
  tree: '🎄',
  snowflake: '❄️',
  gift: '🎁',
  reindeer: '🦌',
  santa: '🎅',
  bear: '🧸',
  bell: '🔔',
  candle: '🕯️',
  snowman: '⛄',
  holly: '🍃',
  penguin: '🐧',
  sleigh: '🛷',
  mitten: '🧤',
  cookie: '🍪'
}

function Door({ door, onClick }) {
  const isOpen = door.isOpen
  const emoji = characterEmojis[door.characterType] || '⭐'

  return (
    <motion.div
      className={`door ${isOpen ? 'door-open' : 'door-closed'}`}
      onClick={onClick}
      whileHover={!isOpen ? { scale: 1.08, y: -8, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' } : {}}
      whileTap={!isOpen ? { scale: 0.96 } : {}}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
    >
      <motion.div
        className="door-front"
        animate={isOpen ? {
          rotateY: -90,
          opacity: 0,
          filter: 'blur(2px)'
        } : {
          rotateY: 0,
          opacity: 1,
          filter: 'none'
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="door-number">{door.number}</div>
        <div className="door-handle"></div>
        {!isOpen && (
          <motion.div
            className="door-shine"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      <motion.div
        className="door-back"
        animate={isOpen ? {
          rotateY: 0,
          opacity: 1,
          scale: [0.9, 1.05, 1],
          boxShadow: '0 0 40px 10px #FFD700'
        } : {
          rotateY: 90,
          opacity: 0,
          scale: 0.9
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="door-content">
          <motion.div
            className="door-character-preview"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={isOpen ? { scale: [0, 1.2, 1], rotate: [ -180, 20, 0 ], opacity: 1 } : { scale: 0, rotate: -180, opacity: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            {emoji}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Door

