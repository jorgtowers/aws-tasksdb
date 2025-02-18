import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { K_API_PATH, K_APP_PATH, K_PAGES_TASKS_PATH } from '../../utils/settings'; // Ajusta las rutas si es necesario
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";

import { iRate } from '../../interfaces/all'; // Importa la interfaz correcta para rates

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewRate() { // Nombre del componente cambiado a NewRate
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
            await deleteRate(router.query.id); // Llama a la función correcta
            router.push('/');
        } else {
            handleClose();
        }
    };

    const [rate, setRate] = useState<iRate>({ // Tipado del state con la interfaz iRate
        description: '',
        vigency: '',
        amount: 0 // Valor inicial para Amount
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                await updateRate(router.query.id, rate); // Llama a la función correcta
            } else {
                await createRate(rate); // Llama a la función correcta
            }
            router.push(`${K_APP_PATH}`);
        } catch (error) {
            console.error(error); // Usa console.error para mostrar errores
        }

    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRate({ ...rate, [name]: value });
    };

    const createRate = async (rate: iRate) => {
        await fetch(`${K_API_PATH}/rates`, { // Ruta correcta para rates
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rate)
        });
    };

    const deleteRate = async (id: string) => {
        await fetch(`${K_API_PATH}/rates/${id}`, { // Ruta correcta para rates
            method: 'DELETE'
        });
    };

    const updateRate = async (id: string, rate: iRate) => {
        await fetch(`${K_API_PATH}/rates/${id}`, { // Ruta correcta para rates
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rate)
        });
    };

    const loadRate = async (id: string) => {
        const res = await fetch(`${K_API_PATH}/rates/${id}`); // Ruta correcta para rates
        const rate = await res.json();
        setRate({
            description: rate.description,
            vigency: rate.vigency,
            amount: rate.amount
        });
    };

    useEffect(() => {
        if (typeof router.query.id === 'string')
            loadRate(router.query.id);
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
                        name="Description" // Nombre del campo ajustado
                        label="Description" // Etiqueta ajustada
                        placeholder="Description" // Placeholder ajustado
                        margin="normal"
                        onChange={handleChange}
                        value={rate.description} // Valor del campo ajustado
                    />

                </div>

                <div>
                    <TextField
                        name="Vigency" // Nombre del campo ajustado
                        label="Vigency" // Etiqueta ajustada
                        type="date" // Tipo de dato para la fecha
                        margin="normal"
                        onChange={handleChange}
                        value={rate.vigency} // Valor del campo ajustado
                    />
                </div>

                <div>
                    <TextField
                        name="Amount" // Nombre del campo ajustado
                        label="Amount" // Etiqueta ajustada
                        type="number" // Tipo de dato numérico
                        margin="normal"
                        onChange={handleChange}
                        value={rate.amount} // Valor del campo ajustado
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