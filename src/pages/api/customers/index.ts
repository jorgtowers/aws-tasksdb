import { NextApiRequest, NextApiResponse } from "next";
import { cnn } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM customers';
                const response = await cnn.query(query);
                return res.status(200).json(response.rows);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }

        case "POST":
            try {
                const { customerName, zone, contactName, contactPhone } = body;

                // Validación de datos (¡muy importante!)
                if (!customerName || !zone || !contactName || !contactPhone) {
                    return res.status(400).json({ message: "Invalid input data" });
                }

                const query = 'INSERT INTO customers(customerName, zone, contactName, contactPhone) VALUES ($1, $2, $3, $4) RETURNING *';
                const values = [customerName, zone, contactName, contactPhone];
                const response = await cnn.query(query, values);
                return res.status(200).json(response.rows[0]);
            } catch (error: any) {
                console.error("Error en POST:", error);
                return res.status(500).json({ message: error.message });
            }

        default:
            return res.status(400).json({ message: "Method not supported" });
    }
};