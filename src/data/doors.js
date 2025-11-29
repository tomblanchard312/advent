const characterTypes = [
  'star', 'tree', 'snowflake', 'gift', 'reindeer', 'santa',
  'bear', 'bell', 'candle', 'snowman', 'holly', 'penguin',
  'sleigh', 'mitten', 'cookie', 'star', 'tree', 'snowflake',
  'gift', 'reindeer', 'santa', 'bear', 'bell', 'cookie'
]

const messages = [
  "🌟 The magic begins! Welcome to your Advent Calendar journey!",
  "🎄 The first snowflake falls, bringing winter's gentle touch.",
  "❄️ Each day brings new wonders and surprises to discover.",
  "🎁 Kindness is the greatest gift you can give this season.",
  "🦌 Nature's beauty surrounds us in this peaceful time.",
  "🎅 The spirit of giving fills the air with warmth and joy.",
  "🧸 Cozy moments and warm memories make this season special.",
  "🎄 Lights twinkle like stars, illuminating the path ahead.",
  "⭐ Dreams come true when you believe in the magic within.",
  "🎁 Friendship is a treasure that grows more precious each day.",
  "❄️ Winter's embrace brings quiet reflection and inner peace.",
  "🦌 Adventure awaits those who follow their hearts.",
  "🎅 Laughter and joy are the best decorations for any home.",
  "🧸 Love is the thread that weaves our lives together.",
  "🎄 Hope shines brightest in the darkest of nights.",
  "⭐ Every moment is a chance to create something beautiful.",
  "🎁 Gratitude turns what we have into enough.",
  "❄️ The beauty of winter reminds us that change brings growth.",
  "🦌 Trust the journey, even when the path is unclear.",
  "🎅 The best gifts come from the heart, not the store.",
  "🧸 Comfort and joy are found in the simplest moments.",
  "🎄 As the days grow shorter, our hearts grow warmer.",
  "⭐ Tomorrow holds infinite possibilities and new beginnings.",
  "🎁 Merry Christmas! May your day be filled with love, laughter, and endless joy! 🎉"
]

export function getDoors() {
  return Array.from({ length: 24 }, (_, i) => ({
    number: i + 1,
    isOpen: false,
    characterType: characterTypes[i],
    message: messages[i]
  }))
}

