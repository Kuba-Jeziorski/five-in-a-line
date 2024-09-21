import { GridItemProps } from "../types";

export const GridItem = ({ row, column, occupied }: GridItemProps) => {
  return (
    <div
      className="gridItem"
      data-row={row}
      data-column={column}
      data-occupied={occupied}
    >
      <div className="gridItemCircle">
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {column}, {row}
        </p>
      </div>
    </div>
  );
};
