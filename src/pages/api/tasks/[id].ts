import { NextApiRequest,NextApiResponse } from "next"
import {cnn} from '../../../utils/database'

export default async (req:NextApiRequest,res:NextApiResponse)=>{
   const { method, body, query: { id }} = req;
   switch (method){
       case "GET":
            try{
                const tsql ='SELECT * FROM tasks WHERE id=$1';
                const values = [id];
                const result= await cnn.query(tsql,values);
                if(!result.rows.some(()=>true))
                    return res.status(404).json({message:'not found'});
                return res.status(200).json(result.rows.at());
            } catch(err:any){
                return res.status(400).json({ message: err.message });
            }
        case "PUT":
            try {
                const { title, description } = body;
                const text =
                "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
                const values = [title, description, id];
                const result = await cnn.query(text, values);
                return res.json(result.rows.at());
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        case "DELETE":
            try {
                const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
                const values = [id];
                const result = await cnn.query(text, values);
        
                if (result.rowCount === 0)
                return res.status(404).json({ message: "Task Not Found" });
        
                return res.json(result.rows.at());
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        default:
            return res.status(400).json({ message: "Method are not supported" });
   }
}