import {Pool} from 'pg'

let cnn:any
if(!cnn){    
    cnn=new Pool({
        user:'postgres',
        password:'NTsoporte01',
        host:'sd-task-db-postgressql.c5ui8m6eq2pp.us-east-1.rds.amazonaws.com',
        port:5432,
        database:'tasksdb',
        ssl: { // Para conexiones seguras (recomendado)
            rejectUnauthorized: false, // Ajusta esto según tu configuración de SSL en AWS
          },
    })
}
export {cnn}