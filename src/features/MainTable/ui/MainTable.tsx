import React from "react";

import {
    Tooltip,
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableContainer,
    Paper,
    CircularProgress,
    Box
} from "@mui/material";

import { StyledTableCell } from "./MainTable.styles";

type TTableHeadersItem = {
    key: string,
    label: React.ReactNode | string,
    getArgs?: (args: any) => React.ReactNode,
    width?: string;
};
type TTableHeaders = TTableHeadersItem[];

interface TMainTable {
    tableHeaderData: TTableHeaders;
    tableData: any;
    isDataLoading?: boolean;
}

const MainTable: React.FC<TMainTable> = ({ tableHeaderData, tableData, isDataLoading = false }) => {

    if (isDataLoading) {
        return (
            <Box textAlign={'center'}>
                <CircularProgress />
            </Box>
        )
    }

    if (tableData.length === 0) {
        return (
            "Ничего не найдено"
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
                <TableHead>
                    <TableRow>
                        {tableHeaderData.map((item, idx) => (
                            <Tooltip title={item.label} arrow key={idx}>
                                <StyledTableCell sx={{ borderRight: 1, borderColor: 'divider', width: item.width ?? "auto" }}>{item.label}</StyledTableCell>
                            </Tooltip>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row: any, rowIndex: number) => (
                        <TableRow
                            key={rowIndex}
                        >
                            {tableHeaderData.map((item) => {
                                return (
                                    <Tooltip title={item.getArgs ? "" : row[item.key]} arrow key={item.key}>
                                        <StyledTableCell sx={{ borderRight: 1, borderColor: 'divider' }}>{item.getArgs ? item.getArgs(row) : row[item.key]}</StyledTableCell>
                                    </Tooltip>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MainTable;