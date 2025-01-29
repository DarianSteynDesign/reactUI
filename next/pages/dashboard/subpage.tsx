import { useRef } from "react";
import Proton from "../../app/ui/Proton/Proton";
import DashboardLayout from "./DashboardLayout";
import {
  clearBubble,
  moveToAnchor,
  moveToGridCell,
  setTalking,
} from "../../app/store/slices/protonSlice";
import { useDispatch } from "react-redux";
import { useMessageFlow } from "../../app/hooks/useMessageFlow";

export default function DashboardSubPage() {
  const dispatch = useDispatch();

  const handleMove = (row: number, col: number) => {
    const position = moveToGridCell(row, col);
    if (position) {
      dispatch(moveToAnchor(position));
    }
  };

  const handleProtonTalk = (message: string) => dispatch(setTalking(message));
  const handleClearTalk = () => dispatch(clearBubble());

  const moveActions = [
    { label: "Move to grid-5-5", position: [5, 5] },
    { label: "Move to grid-3-3", position: [3, 3] },
    { label: "Move to grid-1-1", position: [1, 1] },
    { label: "Move to grid-1-5", position: [1, 5] },
  ];

  const talkActions = [
    { label: "Make Proton Talk", action: () => handleProtonTalk("Hello, I am Proton!") },
    { label: "Make Proton Quiet", action: handleClearTalk },
  ];

  useMessageFlow([
    { text: "This is a subpage within the dashboard.", position: [3, 3], delayTime: 6000 },
    { text: "You can click around this page to see how Proton behaves.", position: [5, 1], delayTime: 6500, clearAfterDelay: true }
  ]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl text-left font-semibold text-white">Subpage</h1>

      <div className="flex flex-wrap gap-3 mt-5">
        {moveActions.map(({ label, position }, index) => (
          <button
            key={index}
            className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={() => handleMove(position[0], position[1])}
          >
            {label}
          </button>
        ))}

        {talkActions.map(({ label, action }, index) => (
          <button
            key={`talk-${index}`}
            className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={action}
          >
            {label}
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
}
