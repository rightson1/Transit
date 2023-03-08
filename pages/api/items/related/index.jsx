import db from "../../../../models/db";
import handleCors from "../../../../models/handleCors";
import Item from "../../../../models/Item";
export default async function handler(req, res) {
    const { method } = req;
    await handleCors(req, res);
    await db();
    switch (method) {
        case "GET":
            try {
                const namesArray = req.query.names?.split(",");
                const items = await Item.find({
                    business: req.query.id,
                    name: { $in: namesArray },
                });

                return res.status(200).json(items);
            } catch (error) {
                return res.status(400).json({ success: error });
            }
    }
}