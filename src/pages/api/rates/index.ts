import { NextApiRequest, NextApiResponse } from "next";
import { cnn } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM rates';
                const response = await cnn.query(query);
                return res.status(200).json(response.rows);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }

        case "POST":
            try {
                const { description, vigency, amount } = body;

                // Validar los datos de entrada (muy importante)
                if (!description || !vigency || !amount || isNaN(amount)) {
                    return res.status(400).json({ message: "Invalid input data" });
                }

                const query = 'INSERT INTO rates(Description, Vigency, Amount) VALUES ($1, $2, $3) RETURNING *';
                const values = [description, vigency, amount];
                const response = await cnn.query(query, values);
                return res.status(200).json(response.rows[0]); // Acceder al primer elemento del array
            } catch (error: any) {
                console.error("Error en POST:", error); // Log para depuración
                return res.status(500).json({ message: error.message }); // 500 para errores del servidor
            }

        default:
            return res.status(400).json({ message: "Method not supported" });
    }
};