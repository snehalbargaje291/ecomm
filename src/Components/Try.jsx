import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const DraggableCard = ({ card, zIndex, onThrow }) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const scale = useSpring(isDragging ? 1.1 : 1, { stiffness: 300, damping: 30 });

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      onThrow();
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full flex justify-center items-center"
      style={{ x, y, opacity, scale, zIndex }}
      drag
      dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-500 mb-4">{card.price}</p>
          <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-full">View Details</button>
        </div>
      </div>
    </motion.div>
  );
};

export default DraggableCard;
