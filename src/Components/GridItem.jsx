export const GridItem = ({ row, column }) => {
  return (
    <div className="gridItem" row={row + 1} column={column + 1} occupied={null}>
      <div className="gridItemCircle"></div>
    </div>
  );
};
