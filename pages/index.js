import {Box, Container, Typography} from "@mui/material";
import {DataGrid, GridToolbarQuickFilter} from "@mui/x-data-grid";
import {stockPricesData} from '../components/data/stockPricesData';
import {useEffect, useMemo, useState} from "react";

function createData(id, symbol, company, poolPrice, oraclePrice, premium, logo) {
    return {
        id, symbol, company, poolPrice, oraclePrice, premium, logo
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

export default function Home() {
    const [rows, setRows] = useState([]);



    useEffect(() => {
        let row = [];
        if (stockPricesData?.length > 0) {
            stockPricesData?.map((item) => {
                row.push(createData(item.id, item.symbol, item.company, item.poolPrice, item.oraclePrice, item.premium, item.logo));
            });
            setRows(row);
        }
    }, []);

    const columns = useMemo(() => [{field: 'id', hide: true},
        {
            field: 'logo',
            headerName: '',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <img src={params.value} style={{objectFit: 'cover', width: '42px', margin: '5px'}} />
        },

        {
            field: 'symbol', headerName: 'Ticker', width: 150, headerAlign: 'center', align: 'center'
        }, {
            field: 'company', headerName: 'Company', width: 220, headerAlign: 'center', align: 'center'
        }, {field: 'poolPrice', headerName: 'Pool Price', width: 220, headerAlign: 'center', align: 'center'}, {
            field: 'oraclePrice', headerName: 'Oracle Price', width: 220, headerAlign: 'center', align: 'center'
        }, {
            field: 'premium', headerName: 'Premium', width: 220, headerAlign: 'center', align: 'center'
        },], []);

    return (<Container maxWidth="lg">
        <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Trade</Typography>
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
