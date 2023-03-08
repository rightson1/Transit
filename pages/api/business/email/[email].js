import db from "../../../../models/db";
import Business from "../../../../models/Business";
export default async function handler(req, res) {
    const { method } = req;
    await db();
    switch (method) {
        case "GET":
            try {
                const business = await Business.findOne({
                    $or: [{ admin: req.query.email }, { admin2: req.query.email }],
                });
                return res.status(200).json(business);
            } catch (error) {
                return res.status(400).json({ success: false });
            }
        case "POST":
            try {
                const { name, desc, blocks, opening, closing, password, admins } =
                req.body;
                console.log(req.body);
                const business = await Business.create({
                    name,
                    desc,
                    blocks,
                    opening,
                    closing,
                    admins,
                    password,
                });
                return res.status(201).json({ success: true, data: business });
            } catch (error) {
                return res.status(400).json({ success: false });
            }
        case "PUT":
            {}
    }
}