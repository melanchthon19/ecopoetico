import { motion } from 'framer-motion'

export default function TutorialAnimatedBorder() {
  return (
    <motion.div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    style={{
      scale: 1.1,
      position: 'absolute',
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      border: '4px solid red',
      borderRadius: '4px',
      pointerEvents: 'none', // Ensure the overlay does not block button clicks
    }}
  />
  )
}
