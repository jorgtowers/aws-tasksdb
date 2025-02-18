import { NextApiRequest, NextApiResponse } from "next";
import { cnn } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM customerRate';
                const response = await cnn.query(query);
                return res.status(200).json(response.rows);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }

        case "POST":
            try {
                const { idCustomer, idRate, factor } = body;

                // Validación de datos (¡crucial!)
                if (!idCustomer || !idRate || !factor || isNaN(idCustomer) || isNaN(idRate) || isNaN(factor)) {
                    return res.status(400).json({ message: "Invalid input data" });
                }

                const query = 'INSERT INTO customerRate(idCustomer, idRate, factor) VALUES ($1, $2, $3) RETURNING *';
                const values = [idCustomer, idRate, factor];
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