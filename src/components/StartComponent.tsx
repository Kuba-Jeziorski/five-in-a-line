import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StartComponent = ({ children }: Props) => {
  return (
    <div className="startWrapper">
      <h1>Five-in-line</h1>
      <div className="buttonWrapper">{children}</div>
    </div>
  );
};
