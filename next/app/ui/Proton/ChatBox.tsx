import { useEffect, useState } from "react";
import styles from "./ChatBox.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ChatBox = ({ text, route }: { text: string | null; route?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { chatBubblePostion } = useSelector(
    (state: RootState) => state.proton
  );

  useEffect(() => {
    if (text === null) return;

    let index = 0;
    let typedText = "";

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        typedText += text[index];
        setDisplayedText(typedText);
        index++;
      } else {
        console.log("Finished typing, clearing interval...");
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return (
    <div 
      className={styles.wrapper}
      style={{
        transform: `translate(${chatBubblePostion.x}%, ${chatBubblePostion.y}%)`
      }}
      >
      <div className={styles.typing_container}>
        <span className={styles.typing_text}>{displayedText}</span>
        {isTyping && <span className={styles.blinking_cursor}>|</span>}
      </div>

      {route && !isTyping && (
        <Link className={styles.chat_link} href={route}>Sign Up</Link>
      )}
    </div>
  );
};

export default ChatBox;
