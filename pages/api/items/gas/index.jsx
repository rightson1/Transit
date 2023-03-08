import db from "../../../../models/db";
import handleCors from "../../../../models/handleCors";
import Item from "../../../../models/Item";
export default async function handler(req, res) {
    const { method } = req;
    await db();
    await handleCors(req, res);
    switch (method) {

        case "GET":

            if (req.query.search) {
                const items = await Item.aggregate([
                    { $match: { name: { $regex: req.query.search, $options: "i" } } },
                ]).limit(10);
                return res.status(200).json(items);
            }
            else if (req.query.category) {
                const items = await Item.find({
                    kg: req.query.kg,
                    category: req.query.category,
                })
                return res.status(200).json(items);
            }

            else {
                try {
                    const items = await Item.find({
                        type: "gas"
                    })
                    return res.status(200).json(items);
                } catch (e) {
                    return res.status(404).json(e)
                }
            }
    }
}
