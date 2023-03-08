import db from "../../../models/db";
import Business from "../../../models/Business";
import handleCors from "../../../models/handleCors";
export default async function handler(req, res) {
    const { method } = req;
    await db();
    await handleCors(req, res)
    switch (method) {
        case "GET":
            try {

                const businessExist = await Business.count({
                    $or: [
                        { admin: req.query.admin },
                        { admin2: req.query.admin }
                    ]
                })
                return res.status(200).json(businessExist);

            }
            catch (error) {
                console.log(error)

                return res.status(400).json({ success: false });
            }


    }
}
