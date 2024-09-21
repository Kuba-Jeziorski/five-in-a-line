export const StartComponent = ({ children }: any) => {
  return (
    <div className="startWrapper">
      <h1>Five-in-line</h1>
      <div className="buttonWrapper">{children}</div>
    </div>
  );
};
