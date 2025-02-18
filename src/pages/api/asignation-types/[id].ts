import { NextApiRequest, NextApiResponse } from "next";
import { cnn } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query: { id } } = req;
    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM asignationTypes WHERE id=$1';
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
                const { description, factor } = body;
                const text =
                    "UPDATE asignationTypes SET description = $1, factor = $2 WHERE id = $3 RETURNING *";
                const values = [description, factor, id];
                const result = await cnn.query(text, values);
                return res.json(result.rows.at());
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        case "DELETE":
            try {
                const text = "DELETE FROM asignationTypes WHERE id = $1 RETURNING *";
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