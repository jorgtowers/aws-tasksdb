import type { NextApiRequest, NextApiResponse } from "next";
import {cnn} from '../../utils/database'

type Data ={
    message:string,
    time:string
}

export default async (req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const response = await cnn.query('SELECT NOW()');

    let rows= response.rows;
    let first=rows.at();

    return res.json({message:'pong', time:first.now});


    // const {method} = req;
    // switch (method){
    //     case "GET":
    //          //return res.status(200).json('GET');
    //      break;
    //     case "POST":
    //      //return res.status(200).json('POST');
    //      break;
    //     case "DELETE":
    //      //return res.status(200).json('DELETE');
    //      break;
    //     case "PUT":
    //     // return res.status(200).json('PUT');
    //      break;
    //     default:
    //         return res.status(400).json('method not allow');
    //      break;
 
    // }
 
 }