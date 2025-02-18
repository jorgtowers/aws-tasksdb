import { NextApiRequest, NextApiResponse } from "next";
import { cnn } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query: { id } } = req;
    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM customers WHERE id=$1';
                const values = [id];
                const result = await cnn.query(query, values);
                if (!result.rows.some(() => true))
                    return res.status(404).json({ message: 'not found' });
                return res.status(200).json(result.rows.at());
            } catch (err: any) {
                return res.status(400).json({ message: err.message });
            }
        case "PUT":
            try {
                const { customername, zone, contactname, contactphone } = body;
                const text =
                    "UPDATE customers SET customername = $1, zone = $2, contactname = $3, contactphone = $4 WHERE id = $5 RETURNING *";
                const values = [customername, zone, contactname, contactphone, id];
                const result = await cnn.query(text, values);
                return res.json(result.rows.at());
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        case "DELETE":
            try {
                const text = "DELETE FROM customers WHERE id = $1 RETURNING *";
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