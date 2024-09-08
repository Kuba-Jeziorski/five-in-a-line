import { GridItemProps } from "../types";

export const GridItem = ({ row, column, occupied }: GridItemProps) => {
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
