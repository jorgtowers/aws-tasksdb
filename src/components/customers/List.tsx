// components/customers/CustomerList.tsx
// ... (estructura similar, cambiando iTask a iCustomer, K_PAGES_TASKS_PATH a K_PAGES_CUSTOMERS_PATH, title a customerName, description a zone y contactName/contactPhone, y eliminando completed)
import React from 'react';
import { iCustomer } from '../../interfaces/all';
import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from "next/router";
import { K_APP_PATH, K_PAGES_CUSTOMERS_PATH } from '../../utils/settings';

// ... (Resto del código similar, adaptando los campos a customerName, zone, contactName, contactPhone)
interface Props {
    items: iCustomer[];
}

export function CustomerList({ items }: Props) {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = React.useState(0);

    const handerCardClick = (ix: any) => {
        let selected = items.findIndex(x => x.id == ix.toString());
        setSelectedCard(ix);
        router.push(`${K_PAGES_CUSTOMERS_PATH}/edit/${ix}`);
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
                                    {item.customerName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.zone}
                                    <br />
                                    {item.contactName}
                                    <br />
                                    {item.contactPhone}

                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>)}
            </Grid>
        </Box>
    );
}