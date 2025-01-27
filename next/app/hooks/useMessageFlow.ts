import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setTalking,
  clearBubble,
  setRoute,
  moveToAnchor,
  moveToGridCell,
  setIdle,
} from "../store/slices/protonSlice";

interface Message {
  text: string;
  position?: [number, number];
  delayTime?: number;
  route?: string;
  clearAfterDelay?: boolean;
  shouldTriggerIdle?: boolean;
}

export const useMessageFlow = (messages: Message[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const delay = (ms: number) =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);
        signal.addEventListener("abort", () => {
          clearTimeout(timeout);
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

    const chainMessages = async () => {
      try {
        dispatch(clearBubble());
        
        for (const { text, position, delayTime, route, clearAfterDelay, shouldTriggerIdle } of messages) {
          if (signal.aborted) break;

          if (position) {
            const gridPosition = moveToGridCell(...position);
            if (gridPosition) {
              dispatch(moveToAnchor(gridPosition));
            }
          }

          dispatch(setTalking(text));
          if (route) {
            dispatch(setRoute(route));
          }

          if (delayTime) {
            await delay(delayTime);

            if(clearAfterDelay) {
              dispatch(clearBubble());
            }
          }

          if(shouldTriggerIdle) {
            dispatch(setIdle());
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error in message flow:", error);
        }
      }
    };

    chainMessages();

    return () => {
      controller.abort();
    };
  }, [dispatch, messages]);
};
