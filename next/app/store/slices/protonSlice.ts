import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProtonState {
  position: { x: number; y: number };
  state: "idle" | "moving" | "talking";
  bubbleText: string | null;
  chatBubblePostion: { x: number; y: number };
  routeTo: string | null;
  showMenu: boolean | null;
}

const initialState: ProtonState = {
  position: { x: 30, y: 30 },
  state: "idle",
  bubbleText: null,
  chatBubblePostion: { x: 30, y: 30 },
  routeTo: null,
  showMenu: false,
};

const protonSlice = createSlice({
  name: "proton",
  initialState,
  reducers: {
    moveToAnchor(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
      state.state = "moving";
      state.showMenu = false;
      state.chatBubblePostion = { x: 0, y: -100 };
      console.log("Proton is moving -->", action.payload);
    },
    setIdle(state) {
      state.state = "idle";
      console.log("Proton is idle -->", state);
    },
    setTalking(state, action: PayloadAction<string>) {
      state.state = "talking";
      state.bubbleText = action.payload;
      console.log("Proton is talking -->", action.payload);
    },
    clearBubble(state) {
      state.bubbleText = null;
      state.state = "idle";
      state.routeTo = null;
      console.log("Proton has stopped talking -->", state);
    },
    setRoute(state, action: PayloadAction<string>) {
      state.showMenu = false;
      state.chatBubblePostion = { x: 0, y: -100 };
      state.routeTo = action.payload;
    },
    resetProtonState() {
      console.log("Resetting Proton's state -->");
      return initialState;
    },
    toggleMenu(state, action: PayloadAction<boolean | undefined>) {
      state.showMenu =
        action.payload !== undefined ? action.payload : !state.showMenu;
    },
    changeChatBoxPostion(
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) {
      state.chatBubblePostion = action.payload;
    },
  },
});

export const moveToGridCell = (row: number, col: number) => {
  const id = `grid-${row}-${col}`;
  const element = document.getElementById(id);

  if (element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY + rect.height / 2,
    };
  }

  console.error(`Anchor ID: ${id} not found!`);
  return null;
};

export const {
  moveToAnchor,
  setIdle,
  setTalking,
  clearBubble,
  setRoute,
  resetProtonState,
  toggleMenu,
  changeChatBoxPostion,
} = protonSlice.actions;
export default protonSlice.reducer;
