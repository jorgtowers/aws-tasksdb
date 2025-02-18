import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { K_API_PATH, K_APP_PATH, K_PAGES_TASKS_PATH } from '../../utils/settings'; // Ajusta las rutas si es necesario
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";

import { iAsignationType } from '../../interfaces/all'; // Importa la interfaz correcta

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewAsignationType() { // Nombre del componente ajustado
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
            await deleteAsignationType(router.query.id);
            router.push('/');
        } else {
            handleClose();
        }
    };

    const [asignationType, setAsignationType] = useState<iAsignationType>({
        description: '',
        factor: 0
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                await updateAsignationType(router.query.id, asignationType);
            } else {
                await createAsignationType(asignationType);
            }
            router.push(`${K_APP_PATH}`);
        } catch (error) {
            console.error(error);
        }

    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAsignationType({ ...asignationType, [name]: value });
    };

    const createAsignationType = async (asignationType: iAsignationType) => {
        await fetch(`${K_API_PATH}/asignation_types`, { // Ruta correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asignationType)
        });
    };

    const deleteAsignationType = async (id: string) => {
        await fetch(`${K_API_PATH}/asignation_types/${id}`, { // Ruta correcta
            method: 'DELETE'
        });
    };

    const updateAsignationType = async (id: string, asignationType: iAsignationType) => {
        await fetch(`${K_API_PATH}/asignation_types/${id}`, { // Ruta correcta
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asignationType)
        });
    };

    const loadAsignationType = async (id: string) => {
        const res = await fetch(`${K_API_PATH}/asignation_types/${id}`); // Ruta correcta
        const asignationType = await res.json();
        setAsignationType({
            description: asignationType.description,
            factor: asignationType.factor
        });
    };

    useEffect(() => {
        if (typeof router.query.id === 'string')
            loadAsignationType(router.query.id);
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
                        name="description"
                        label="Description"
                        placeholder="Description"
                        margin="normal"
                        onChange={handleChange}
                        value={asignationType.description}
                    />
                </div>

                <div>
                    <TextField
                        name="factor"
                        label="Factor"
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                        value={asignationType.factor}
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