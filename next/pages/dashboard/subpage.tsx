import { useRef } from "react";
import Proton from "../../app/ui/Proton/Proton";
import DashboardLayout from "../components/DashboardLayout";

export default function DashboardSubPage() {
  const protonRef = useRef<any>(null);

  return (
    <DashboardLayout>
      <h1>Subpage</h1>
      <p>This is a subpage within the dashboard.</p>

      <button onClick={() => protonRef.current?.moveToAnchor("left")} className="w-100 px-4 py-2 text-white bg-blue-600 rounded-md mr-10">
        Move Proton to Bottom Left
      </button>
      <button onClick={() => protonRef.current?.moveToAnchor("right")} className="w-100 px-4 py-2 text-white bg-blue-600 rounded-md mr-10">
        Move Proton to Bottom Right
      </button>
      <button onClick={() => protonRef.current?.showBubble("Welcome to my site!")} className="w-100 px-4 py-2 text-white bg-blue-600 rounded-md">
        Show Welcome Message
      </button>

      <Proton ref={protonRef} />

      <div className="h-full flex">
        <div id="left" className="relative w-10 h-10 mr-auto mt-auto bg-gray-800"></div>
        <div id="right" className="relative w-10 h-10 ml-auto mt-auto bg-gray-800"></div>
      </div>
    </DashboardLayout>
  );
}
