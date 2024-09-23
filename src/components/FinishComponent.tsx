import { Winner } from "../types";

export const FinishComponent = ({ winner }: Winner) => {
  const background = winner === "Player1" ? "yellow" : "red";

  return (
    <div className="startWrapper">
      <h1>
        <span style={{ background }}>{winner}</span> won!
      </h1>
    </div>
  );
};
