import Image from "next/image";
import styles from "../app/page.module.css";
import {iTask} from '../interfaces/iTask';
import Button from '@mui/material/Button';
import {K_API_PATH, K_PAGES_TASKS_PATH} from '../utils/settings';
//Para poder navegar entre pantallas useRouter
import { useRouter } from "next/router";
import { TaskList } from "@/components/tasks/TaskList";
import Navbar from "@/components/Navbar";

interface Props{
  tasks:iTask[]
}

export default function index({tasks}:Props) {

  const router = useRouter();

    return <>
            <Navbar/>
          { tasks.length===0?
            ( <div>
                <h1>no tasks yet</h1>
                <Button onClick={()=>router.push(`${K_PAGES_TASKS_PATH}/new`)}>Create one</Button>
              </div>) : 
            <TaskList items={tasks}/>
          }
    </>
  
}

export const getServerSideProps = async ()=>{
  const res = await fetch(`${K_API_PATH}/tasks`);
  const tasks = await res.json();
  return  {
      props:{
          tasks:tasks
      }
  }
}
