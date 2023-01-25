import React, {useEffect, useMemo, useState} from 'react';
import {stockBorrowPricesData} from '../../components/data/stockBorrowPricesData';
import {DataGrid, GridActionsCellItem, GridToolbarQuickFilter} from "@mui/x-data-grid";
import {Box, Button, Container, Typography} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {useRouter} from "next/router";

function createData(id, symbol, company, poolPrice, oraclePrice, premium, logo, minCol) {
    return {
        id, symbol, company, poolPrice, oraclePrice, premium, logo, minCol
    };
}

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                pl: 2,
                pt: 1.5
            }}
        >
            <GridToolbarQuickFilter />
        </Box>
    );
}

const Trade = () => {
    const [rows, setRows] = useState([]);
    const router = useRouter();



    useEffect(() => {
        let row = [];
        if (stockBorrowPricesData?.length > 0) {
            stockBorrowPricesData?.map((item) => {
                row.push(createData(item.id, item.symbol, item.company, item.poolPrice, item.oraclePrice, item.premium, item.logo, item.minCol));
            });
            setRows(row);
        }
    }, []);

    const borrowStock = React.useCallback(
        (params) => async () => {
            console.log(params);
            router.push(
                {
                    pathname: `borrow/${params.symbol}`,
                    query: {
                        id: params?.id
                    },
                },
                undefined,
                {shallow: true},
            );
        },
        []
    );

    const columns = useMemo(() => [{field: 'id', hide: true},
        {
            field: 'logo',
            headerName: 'Stock',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <img src={params.value} style={{objectFit: 'cover', width: '42px', margin: '5px'}} />
        },

        {
        field: 'symbol', headerName: 'Ticker', width: 110, headerAlign: 'center', align: 'center'
    }, {
        field: 'company', headerName: 'Company', width: 150, headerAlign: 'center', align: 'center'
    }, {field: 'poolPrice', headerName: 'Pool Price', width: 130, headerAlign: 'center', align: 'center'}, {
        field: 'oraclePrice', headerName: 'Oracle Price', width: 150, headerAlign: 'center', align: 'center'
    }, {
        field: 'premium', headerName: 'Premium', width: 120, headerAlign: 'center', align: 'center'
    }, {
            field: 'minCol', headerName: 'Min. Col. Ratio', width: 120, headerAlign: 'center', align: 'center'
        },
        {
            field: 'buyAction',
            headerName: 'Borrow Stock',
            type: 'actions',
            width: '110',
            getActions: (params) => [
                <GridActionsCellItem
                    key={params.id}
                    icon={<Button variant="contained" sx={{my: 2}} startIcon={<MonetizationOnIcon/>}>Borrow</Button>}
                    label="Borrow"
                    onClick={borrowStock(params.row)}
                />
            ],
        }
    ], []);

    return (<Container maxWidth="lg">
        <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Borrow</Typography>
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{field: 'updatedAt', sort: 'asc'}],
                },
            }}
            autoHeight
            rows={rows}
            columns={columns}
            components={{ Toolbar: QuickSearchToolbar }}
        />
    </Container>);
};

export default Trade;