import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { K_API_PATH, K_APP_PATH, K_PAGES_TASKS_PATH } from '../../utils/settings'; // Ajusta las rutas si es necesario
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";

import { iCustomerRate } from '../../interfaces/all'; // Importa la interfaz correcta para customer_rates

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewCustomerRate() { // Nombre del componente cambiado a NewCustomerRate
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = async () => {
        if (typeof router.query.id === 'string') {
            await deleteCustomerRate(router.query.id); // Llama a la función correcta
            router.push('/');
        } else {
            handleClose();
        }
    };

    const [customerRate, setCustomerRate] = useState<iCustomerRate>({ // Tipado del state con la interfaz iCustomerRate
        idCustomer: 0,
        idRate: 0,
        factor: 0
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                await updateCustomerRate(router.query.id, customerRate); // Llama a la función correcta
            } else {
                await createCustomerRate(customerRate); // Llama a la función correcta
            }
            router.push(`${K_APP_PATH}`);
        } catch (error) {
            console.error(error); // Usa console.error para mostrar errores
        }

    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCustomerRate({ ...customerRate, [name]: value });
    };

    const createCustomerRate = async (customerRate: iCustomerRate) => {
        await fetch(`${K_API_PATH}/customer_rates`, { // Ruta correcta para customer_rates
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerRate)
        });
    };

    const deleteCustomerRate = async (id: string) => {
        await fetch(`${K_API_PATH}/customer_rates/${id}`, { // Ruta correcta para customer_rates
            method: 'DELETE'
        });
    };

    const updateCustomerRate = async (id: string, customerRate: iCustomerRate) => {
        await fetch(`${K_API_PATH}/customer_rates/${id}`, { // Ruta correcta para customer_rates
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerRate)
        });
    };

    const loadCustomerRate = async (id: string) => {
        const res = await fetch(`${K_API_PATH}/customer_rates/${id}`); // Ruta correcta para customer_rates
        const customerRate = await res.json();
        setCustomerRate({
            idCustomer: customerRate.idCustomer,
            idRate: customerRate.idRate,
            factor: customerRate.factor
        });
    };

    useEffect(() => {
        if (typeof router.query.id === 'string')
            loadCustomerRate(router.query.id);
    }, [router.query]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '25ch' },
            }}>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        required
                        name="idCustomer" // Nombre del campo ajustado
                        label="ID Customer" // Etiqueta ajustada
                        type="number" // Tipo de dato numérico
                        margin="normal"
                        onChange={handleChange}
                        value={customerRate.idCustomer} // Valor del campo ajustado
                    />

                </div>

                <div>
                    <TextField
                        name="idRate" // Nombre del campo ajustado
                        label="ID Rate" // Etiqueta ajustada
                        type="number" // Tipo de dato numérico
                        margin="normal"
                        onChange={handleChange}
                        value={customerRate.idRate} // Valor del campo ajustado
                    />
                </div>

                <div>
                    <TextField
                        name="factor" // Nombre del campo ajustado
                        label="Factor" // Etiqueta ajustada
                        type="number" // Tipo de dato numérico
                        margin="normal"
                        onChange={handleChange}
                        value={customerRate.factor} // Valor del campo ajustado
                    />
                </div>


                {
                    router.query.id ? (<Button variant="contained" color='warning' type='submit'>Update</Button>) :
                        (<Button variant="contained" color='primary' type='submit'>Save</Button>)
                }
                <Button variant="contained" color='error' onClick={handleClickOpen}>Delete</Button>

            </form>
            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Administrador?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Seguro de querer eliminar?.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOk} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Box>
    )
}