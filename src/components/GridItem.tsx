type Props = {
  row: number;
  column: number;
  occupied: string | null;
};

export const GridItem = ({ row, column, occupied }: Props) => {
  return (
    <div
      className="gridItem"
      data-row={row}
      data-column={column}
      data-occupied={occupied}
    >
      <div className="gridItemCircle"></div>
    </div>
  );
};
