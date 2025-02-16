import React,{ChangeEvent, FormEvent, useState,useEffect} from 'react'
import {K_API_PATH,K_APP_PATH, K_PAGES_TASKS_PATH} from '../../utils/settings';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";

import {iTask} from '../../interfaces/iTask';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function newTask(){  
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleOk = async () => {
        if(typeof router.query.id ==='string'){
            await  deleteTask(router.query.id);
            router.push('/');
        } else{
            handleClose();
        }
      };

    //Uso useState para mantener el estado de la tarea para mostrar en pantalla
    const [task,setTask]=useState({
        title:'',
        description:''
    });

    //Evento de Submit para enviar a crear la tarea en el BE
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
       
        e.preventDefault();
        try{
            if(typeof router.query.id ==='string'){
                await  updateTask(router.query.id, task);
            } else {
                await  createTask(task);               
            }
           router.push(`${K_APP_PATH}`);
        } catch(error){
            console.log(error);
        }
        
      };
    //Evento de cambio de valores en los textboxs para mantener actualizado el state
    const handleChange = ({target:{name,value}}:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
        {           
            setTask({...task,[name]:value});
        };

    //Function para invocar al BE y crear el nuevo registro
    const createTask = async (task:iTask)=>{
        await fetch(`${K_API_PATH}/tasks`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(task)
        });
    };

    //Function para invocar al BE y ELIMINAR el registro existente
    const deleteTask = async (id:string)=>{
        await fetch(`${K_API_PATH}/tasks/${id}`,{
            method:'DELETE'
        });
    };

     //Function para invocar al BE y actualizar el registro existente
     const updateTask = async (id:string, task:iTask)=>{
        await fetch(`${K_API_PATH}/tasks/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(task)
        });
    };

    //Function para invocar al BE y buscar una task por su id
    const loadTask = async (id:string)=>{
        const res = await fetch(`${K_API_PATH}/tasks/${id}`);
        const task = await res.json();
        setTask({
            title:task.title,
            description:task.description
        });
    };

    /* 
        Ejecuto useEffect para validar si el objecto ha cambiado
        comprueba valores cada vez que se visita la pagina.
        el cambio se basara en lo que esta entre [], en este caso cada cambio en el [router.query] 
     */
    useEffect(()=>{
        if(typeof router.query.id ==='string')
            loadTask(router.query.id);
    },[router.query]);

    //Retorno object jsx para renderizar
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
                            name="title"
                            label="Required"
                            placeholder="Title"
                            margin="normal"
                            onChange={handleChange}
                            value={task.title}
                            />
                          
                        </div>
                       
                        <div>
                        <TextField
                            name="description"
                            label="Multiline"
                            multiline
                            rows={4}
                            placeholder="Write a descriptions"
                            margin="normal"
                            onChange={handleChange}
                            value={task.description}
                            />
                        </div>
                  
                        
                        {
                            router.query.id ? (<Button variant="contained" color='warning' type='submit'>Update</Button>) : 
                                              (<Button variant="contained"  color='primary' type='submit'>Save</Button>)
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