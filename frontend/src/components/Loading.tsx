import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <motion.div
        className="h-16 w-16 bg-accent"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loading;
