import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Proton.module.scss";

export interface ProtonProps {
  initialPosition?: { x: number; y: number };
}

export interface ProtonRef {
  moveToAnchor: (anchorId: string) => void;
  showBubble: (text: string) => void;
}

const Proton = forwardRef<ProtonRef, ProtonProps>(({ initialPosition = { x: 150, y: 150 } }, ref) => {
  const [position, setPosition] = useState(initialPosition);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isLooking, setIsLooking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLooking(true);
      setTimeout(() => setIsLooking(false), 5000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useImperativeHandle(ref, () => ({
    moveToAnchor(anchorId: string) {
      const anchor = document.getElementById(anchorId);
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setPosition({
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY + rect.height / 2,
        });
      }
    },
    showBubble(text: string) {
      setBubbleText(text);
      setTimeout(() => setBubbleText(null), 3000);
    },
  }));

  return (
<div className={styles["proton-container"]} style={{ left: position.x, top: position.y }}>
  {/* Proton */}
  <div className={styles.proton}>
  <div className={`${styles.eye} ${styles.left} ${isLooking ? styles["looking"] : ""}`}></div>
  <div className={`${styles.eye} ${styles.right} ${isLooking ? styles["looking"] : ""}`}></div>
  <div className={styles["orbiting-circle"]} style={{ animationDuration: "3s" }}></div>
  <div className={styles["orbiting-circle"]} style={{ animationDuration: "5s" }}></div>
  <div className={styles["orbiting-circle"]} style={{ animationDuration: "7s" }}></div>
</div>


  {/* Speech Bubble */}
  <AnimatePresence>
    {bubbleText && (
      <motion.div
        className={styles["speech-bubble"]}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {bubbleText}
      </motion.div>
    )}
  </AnimatePresence>
</div>
  );
});

export default Proton;
