import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { AnimatePresence } from "framer-motion";
import styles from "./Proton.module.scss";
import { toggleMenu } from "../../store/slices/protonSlice";
import { RootState } from "../../store/store";
import ChatBox from "./ChatBox";
import { useRouter } from "next/router";

const Proton = () => {
  //const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { position, state, bubbleText, route, showMenu } = useSelector(
    (state: RootState) => state.proton
  );
  const routes = [
    { name: "Home", path: "/" },
    { name: "Sign Up", path: "/signup" },
    { name: "Login", path: "/login" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  return (
    <div
      className={styles["proton-container"]}
      style={{
        left: position.x,
        top: position.y,
        position: "absolute",
        transition: "left 0.5s ease, top 0.5s ease",
      }}
    >
      <AnimatePresence>
        {bubbleText && <ChatBox text={bubbleText} route={route ?? undefined} />}
      </AnimatePresence>

      {/* Proton */}
      <div className={styles.proton} onClick={handleMenuToggle}>
        {/* Eyes */}
        <div
          className={`${styles.eye} ${styles.left} ${
            state === "idle" ? styles["looking"] : ""
          }`}
        ></div>
        <div
          className={`${styles.eye} ${styles.right} ${
            state === "idle" ? styles["looking"] : ""
          }`}
        ></div>

        {/* Orbiting Circles */}
        <div
          className={styles["orbiting-circle"]}
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className={styles["orbiting-circle"]}
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className={styles["orbiting-circle"]}
          style={{ animationDuration: "10s" }}
        ></div>
      </div>

      {showMenu && (
        <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-48">
          {/* Routes Menu */}
          <div>
            <ul className="mt-2 space-y-2">
              {routes.map((route) => (
                <li
                  key={route.path}
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => router.push(route.path)}
                >
                  {route.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proton;
