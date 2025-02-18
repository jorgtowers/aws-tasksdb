// components/customer_rates/CustomerRateList.tsx
// ... (similar, adaptando campos a idCustomer, idRate, factor)
import React from 'react';
import { iCustomerRate } from '../../interfaces/all';
import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from "next/router";
import { K_APP_PATH, K_PAGES_CUSTOMER_RATES_PATH } from '../../utils/settings';

// ... (Resto del código similar, adaptando los campos a idCustomer, idRate, factor)

interface Props {
    items: iCustomerRate[];
}

export function CustomerRateList({ items }: Props) {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = React.useState(0);

    const handerCardClick = (ix: any) => {
        let selected = items.findIndex(x => x.id == ix.toString());
        setSelectedCard(ix);
        router.push(`<span class="math-inline">\{K\_PAGES\_CUSTOMER\_RATES\_PATH\}/edit/</span>{ix}`);
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
            }}>
            <Grid container spacing={2}>
                {items.map((item, index) =>
                    <Card key={item.id}>
                        <CardActionArea
                            onClick={() => handerCardClick(item.id)}
                            data-active={selectedCard === index ? '' : undefined}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}>
                            <CardContent sx={{ height: '100%' }}>
                                <Typography variant="h5" component="div">
                                    ID Customer: {item.idCustomer}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID Rate: {item.idRate}
                                    <br />
                                    Factor: {item.factor}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>)}
            </Grid>
        </Box>
    );
}