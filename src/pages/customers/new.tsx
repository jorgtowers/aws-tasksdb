import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { K_API_PATH, K_APP_PATH, K_PAGES_TASKS_PATH } from '../../utils/settings'; // Ajusta las rutas si es necesario
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";

import { iCustomer } from '../../interfaces/all'; // Importa la interfaz correcta para customers

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewCustomer() { // Nombre del componente cambiado a NewCustomer
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
            await deleteCustomer(router.query.id); // Llama a la función correcta
            router.push('/');
        } else {
            handleClose();
        }
    };

    const [customer, setCustomer] = useState<iCustomer>({ // Tipado del state con la interfaz iCustomer
        customerName: '',
        zone: '',
        contactName: '',
        contactPhone: ''
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                await updateCustomer(router.query.id, customer); // Llama a la función correcta
            } else {
                await createCustomer(customer); // Llama a la función correcta
            }
            router.push(`${K_APP_PATH}`);
        } catch (error) {
            console.error(error); // Usa console.error para mostrar errores
        }

    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCustomer({ ...customer, [name]: value });
    };

    const createCustomer = async (customer: iCustomer) => {
        await fetch(`${K_API_PATH}/customers`, { // Ruta correcta para customers
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
    };

    const deleteCustomer = async (id: string) => {
        await fetch(`${K_API_PATH}/customers/${id}`, { // Ruta correcta para customers
            method: 'DELETE'
        });
    };

    const updateCustomer = async (id: string, customer: iCustomer) => {
        await fetch(`${K_API_PATH}/customers/${id}`, { // Ruta correcta para customers
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
    };

    const loadCustomer = async (id: string) => {
        const res = await fetch(`${K_API_PATH}/customers/${id}`); // Ruta correcta para customers
        const customer = await res.json();
        setCustomer({
            customerName: customer.customerName,
            zone: customer.zone,
            contactName: customer.contactName,
            contactPhone: customer.contactPhone
        });
    };

    useEffect(() => {
        if (typeof router.query.id === 'string')
            loadCustomer(router.query.id);
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
                        name="customerName" // Nombre del campo ajustado
                        label="Customer Name" // Etiqueta ajustada
                        placeholder="Customer Name" // Placeholder ajustado
                        margin="normal"
                        onChange={handleChange}
                        value={customer.customerName} // Valor del campo ajustado
                    />

                </div>

                <div>
                    <TextField
                        name="zone" // Nombre del campo ajustado
                        label="Zone" // Etiqueta ajustada
                        placeholder="Zone" // Placeholder ajustado
                        margin="normal"
                        onChange={handleChange}
                        value={customer.zone} // Valor del campo ajustado
                    />
                </div>

                <div>
                    <TextField
                        name="contactName" // Nombre del campo ajustado
                        label="Contact Name" // Etiqueta ajustada
                        placeholder="Contact Name" // Placeholder ajustado
                        margin="normal"
                        onChange={handleChange}
                        value={customer.contactName} // Valor del campo ajustado
                    />
                </div>

                <div>
                    <TextField
                        name="contactPhone" // Nombre del campo ajustado
                        label="Contact Phone" // Etiqueta ajustada
                        placeholder="Contact Phone" // Placeholder ajustado
                        margin="normal"
                        onChange={handleChange}
                        value={customer.contactPhone} // Valor del campo ajustado
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