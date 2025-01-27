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

export default function DashboardSubPage() {
  const dispatch = useDispatch();

  const handleMove = (row: number, col: number) => {
    const position = moveToGridCell(row, col);
    if (position) {
      dispatch(moveToAnchor(position));
    }
  };

  const handleProtonTalk = (message: string) => {
    dispatch(setTalking(message));
  };

  const handleClearTalk = () => {
    dispatch(clearBubble());
  };

  return (
    <DashboardLayout>
      <h1>Subpage</h1>
      <p>This is a subpage within the dashboard.</p>

      <div>
        <button className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md mr-5" onClick={() => handleMove(5, 5)}>Move to grid-5-5</button>
        <button className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md mr-5" onClick={() => handleMove(3, 3)}>Move to grid-3-3</button>
        <button className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md mr-5" onClick={() => handleMove(1, 1)}>Move to grid-1-1</button>
        <button className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md mr-5" onClick={() => handleMove(1, 5)}>Move to grid-1-5</button>
        <button className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md mr-5" onClick={() => handleProtonTalk("Hello, I am Proton!")}>
          Make Proton Talk
        </button>
        <button className="w-120 px-4 py-2 text-white bg-blue-600 rounded-md mr-5" onClick={() => handleClearTalk()}>
          Make Proton quiet
        </button>
      </div>
    </DashboardLayout>
  );
}
