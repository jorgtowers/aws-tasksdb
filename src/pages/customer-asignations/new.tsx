import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { K_API_PATH, K_APP_PATH, K_PAGES_TASKS_PATH } from '../../utils/settings'; // Ajusta las rutas si es necesario
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";

import { iCustomerAsignation } from '../../interfaces/all'; // Importa la interfaz correcta

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewCustomerAsignation() { // Nombre del componente ajustado
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
            await deleteCustomerAsignation(router.query.id);
            router.push('/');
        } else {
            handleClose();
        }
    };

    const [customerAsignation, setCustomerAsignation] = useState<iCustomerAsignation>({
        idCustomer: 0,
        fecha: '',
        asignationTypeId: 0,
        quantity: 0
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                await updateCustomerAsignation(router.query.id, customerAsignation);
            } else {
                await createCustomerAsignation(customerAsignation);
            }
            router.push(`${K_APP_PATH}`);
        } catch (error) {
            console.error(error);
        }

    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCustomerAsignation({ ...customerAsignation, [name]: value });
    };

    const createCustomerAsignation = async (customerAsignation: iCustomerAsignation) => {
        await fetch(`${K_API_PATH}/customer_asignations`, { // Ruta correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerAsignation)
        });
    };

    const deleteCustomerAsignation = async (id: string) => {
        await fetch(`${K_API_PATH}/customer_asignations/${id}`, { // Ruta correcta
            method: 'DELETE'
        });
    };

    const updateCustomerAsignation = async (id: string, customerAsignation: iCustomerAsignation) => {
        await fetch(`${K_API_PATH}/customer_asignations/${id}`, { // Ruta correcta
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerAsignation)
        });
    };

    const loadCustomerAsignation = async (id: string) => {
        const res = await fetch(`${K_API_PATH}/customer_asignations/${id}`); // Ruta correcta
        const customerAsignation = await res.json();
        setCustomerAsignation({
            idCustomer: customerAsignation.idCustomer,
            fecha: customerAsignation.fecha,
            asignationTypeId: customerAsignation.asignationTypeId,
            quantity: customerAsignation.quantity
        });
    };

    useEffect(() => {
        if (typeof router.query.id === 'string')
            loadCustomerAsignation(router.query.id);
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
                        name="idCustomer"
                        label="ID Customer"
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                        value={customerAsignation.idCustomer}
                    />
                </div>

                <div>
                    <TextField
                        name="fecha"
                        label="Fecha"
                        type="date" // Input de tipo fecha
                        margin="normal"
                        onChange={handleChange}
                        value={customerAsignation.fecha}
                    />
                </div>

                <div>
                    <TextField
                        name="asignationTypeId"
                        label="ID Asignation Type"
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                        value={customerAsignation.asignationTypeId}
                    />
                </div>

                <div>
                    <TextField
                        name="quantity"
                        label="Quantity"
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                        value={customerAsignation.quantity}
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