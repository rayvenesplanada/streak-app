export const hotStreakMotion = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 1, 1, 1, 1, 1, 1],
    scale: [1, 1.2, 1, 1.2, 1, 1.1, 1],
  },
  transition: {
    delay: 0.5,
    duration: 1.2,
    times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
    ease: "easeInOut"
  } 
};

export const daysMotion = (delay) => {
  return {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      delay: delay,
      duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    },
  };
}; 