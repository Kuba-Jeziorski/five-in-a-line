import { Winner } from "../types";

export const FinishComponent = ({ winner }: Winner) => {
  return (
    <div className="startWrapper">
      <h1>{winner} won!</h1>
    </div>
  );
};
