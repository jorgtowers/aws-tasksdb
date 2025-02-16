import { NextApiRequest,NextApiResponse } from "next"
import {cnn} from '../../../utils/database'

export default async (req:NextApiRequest,res:NextApiResponse)=>{
   const { method, body } = req;
   switch (method){
       case "GET":
        try{
            const query ='SELECT * FROM tasks';
            const response = await cnn.query(query);
            return res.status(200).json(response.rows);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }        
       case "POST":
            try{
                const {title,description}=body;
                const query ='INSERT INTO tasks(title,description,completed) VALUES ($1,$2,$3) RETURNING *';
                const values = [title,description,0];
                const response= await cnn.query(query,values);
                return res.status(200).json(response.rows.at());
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
       default:
            return res.status(400).json({ message: "Method are not supported" });

   }

}