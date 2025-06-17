'use client';

import { motion } from 'framer-motion';

const FloatingElements = ({ elements }) => {
  const getShape = (type, size, color) => {
    const baseClasses = "absolute opacity-20";
    const colorClasses = {
      blue: "text-blue-400",
      purple: "text-purple-400"
    };

    switch (type) {
      case 'circle':
        return (
          <motion.div
            className={`${baseClasses} ${colorClasses[color]} rounded-full`}
            style={{ width: size, height: size }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      case 'square':
        return (
          <motion.div
            className={`${baseClasses} ${colorClasses[color]}`}
            style={{ width: size, height: size }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, -360],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            className={`${baseClasses} ${colorClasses[color]}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid currentColor`
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: element.x,
            top: element.y
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: element.delay,
            ease: "easeOut"
          }}
        >
          {getShape(element.type, element.size, element.color)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements; 