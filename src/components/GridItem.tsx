type Props = {
  row: number;
  column: number;
};

export const GridItem = ({ row, column }: Props) => {
  return (
    <div
      className="gridItem"
      data-row={row + 1}
      data-column={column + 1}
      data-occupied={null}
    >
      <div className="gridItemCircle"></div>
    </div>
  );
};
