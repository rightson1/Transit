import db from "../../../models/db";
import handleCors from "../../../models/handleCors";
import Item from "../../../models/Item";
export default async function handler(req, res) {
    const { method } = req;
    await db();
    await handleCors(req, res);
    switch (method) {
        case "GET":
            const items = await Item.aggregate([{
                $match: {
                    name: { $regex: req.query.search, $options: "i" },
                    type: "foods",
                },
            }, ]).limit(10);
            return res.status(200).json(items);
    }
}