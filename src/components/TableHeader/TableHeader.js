import React from 'react'
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel
} from '@mui/material'


export const TableHeader = ({valueToOrder, orderDirection, handleSortDirection}) => {
  
  
    const createSortHandler = (property) => (event) => {
           handleSortDirection(event, property)
    }
    
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <TableSortLabel
                        active={valueToOrder === "system_name"}
                        direction={valueToOrder === "system_name" ? orderDirection: "asc"}
                        onClick={createSortHandler("system_name")}
                    >
                        System Name
                    </TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        active={valueToOrder === "device_type"}
                        direction={valueToOrder === "device_type" ? orderDirection: "asc"}
                        onClick={createSortHandler("device_type")}
                    >
                        Device Type
                    </TableSortLabel>
                </TableCell>

                <TableCell>
                    <TableSortLabel
                        
                        active={valueToOrder === "hdd_capicity"}
                        direction={valueToOrder === "hdd_capicity" ? orderDirection: "asc"}
                        onClick={createSortHandler("hdd_capicity")}
                    >
                        HDD Capicity
                    </TableSortLabel>
                </TableCell>
                <TableCell>
                        Edit
                </TableCell>
                <TableCell>
                        Delet
                </TableCell>


            </TableRow>
        </TableHead>
    )
}
