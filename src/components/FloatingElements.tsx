import { motion } from "framer-motion";

const FloatingElements = () => {
  const elements = [
    { size: "w-20 h-20", top: "10%", left: "5%", delay: 0 },
    { size: "w-16 h-16", top: "20%", right: "10%", delay: 2 },
    { size: "w-24 h-24", bottom: "15%", left: "8%", delay: 4 },
    { size: "w-12 h-12", top: "60%", right: "5%", delay: 1.5 },
    { size: "w-18 h-18", top: "45%", left: "3%", delay: 3 },
    { size: "w-14 h-14", bottom: "25%", right: "15%", delay: 0.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} rounded-full opacity-20`}
          style={{
            background: "var(--gradient-floating)",
            top: element.top,
            bottom: element.bottom,
            left: element.left,
            right: element.right,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;