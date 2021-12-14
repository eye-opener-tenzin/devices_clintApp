import React from "react";
import { TableCell, Input } from "@mui/material";

const RowTableCell = ({ row, dataList, onChange }) => {
  const { isEditMode } = row;
  return (
    <TableCell align="left">
      {isEditMode ? (
        <Input
          value={row[dataList]}
          name={dataList}
          onChange={(e) => onChange(e, row)}
        />
      ) : (
        row[dataList]
      )}
    </TableCell>
  );
};

export default RowTableCell;
