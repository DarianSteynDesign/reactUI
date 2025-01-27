import React from "react";
import { useDispatch } from "react-redux";
import styles from "./AnchorGrid.module.scss";
import { moveToAnchor } from "../../store/slices/protonSlice";

const AnchorGrid: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
  const dispatch = useDispatch();

  const handleAnchorClick = (id: string, x: number, y: number) => {
    dispatch(moveToAnchor({ x, y }));
  };

  return (
    <div className={styles.grid}>
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: cols }).map((_, colIndex) => {
          const id = `grid-${rowIndex + 1}-${colIndex + 1}`;
          const x = colIndex * 100;
          const y = rowIndex * 100;

          return (
            <div
              key={id}
              id={id}
              className={styles.anchor}
            ></div>
          );
        })
      )}
    </div>
  );
};

export default AnchorGrid;
