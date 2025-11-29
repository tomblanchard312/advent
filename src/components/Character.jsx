import { motion } from 'framer-motion'
import './Character.css'

const characters = {
  star: { emoji: '⭐', name: 'Star', color: '#FFD700' },
  tree: { emoji: '🎄', name: 'Christmas Tree', color: '#228B22' },
  snowflake: { emoji: '❄️', name: 'Snowflake', color: '#B0E0E6' },
  gift: { emoji: '🎁', name: 'Gift', color: '#FF6B6B' },
  reindeer: { emoji: '🦌', name: 'Reindeer', color: '#8B4513' },
  santa: { emoji: '🎅', name: 'Santa', color: '#DC143C' },
  bear: { emoji: '🧸', name: 'Teddy Bear', color: '#DEB887' },
  bell: { emoji: '🔔', name: 'Bell', color: '#FFD700' },
  candle: { emoji: '🕯️', name: 'Candle', color: '#FFA500' },
  snowman: { emoji: '⛄', name: 'Snowman', color: '#FFFFFF' },
  holly: { emoji: '🍃', name: 'Holly', color: '#43A047' },
  penguin: { emoji: '🐧', name: 'Penguin', color: '#212121' },
  sleigh: { emoji: '🛷', name: 'Sleigh', color: '#B71C1C' },
  mitten: { emoji: '🧤', name: 'Mitten', color: '#90CAF9' },
  cookie: { emoji: '🍪', name: 'Cookie', color: '#A1887F' }
};

function Character({ type }) {
  const char = characters[type] || characters.star;
  return (

    <motion.div
      className="character-container"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      <motion.div
        className="character-emoji"
        animate={{
          rotate: [0, 15, -15, 10, -10, 0],
          scale: [1, 1.15, 1, 1.1, 1]
        }}
        transition={{
          duration: 2.5,
          repeat: 1,
          repeatDelay: 0.5
        }}
        style={{ color: char.color }}
      >
        {char.emoji}
      </motion.div>

      <motion.div
        className="character-glow"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{
          duration: 2.2,
          repeat: 1,
          ease: "easeInOut"
        }}
        style={{ backgroundColor: char.color }}
      />

      <motion.div className="character-sparkles">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              x: [0, Math.cos(i * Math.PI / 5) * 60],
              y: [0, Math.sin(i * Math.PI / 5) * 60]
            }}
            transition={{
              duration: 1.8,
              repeat: 1,
              delay: i * 0.12,
              ease: "easeOut"
            }}
            style={{ color: char.color }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Character;

