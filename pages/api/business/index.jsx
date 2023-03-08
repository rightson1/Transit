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
                const businesses = await Business.findOne({});
                return res.status(200).json(businesses);

            } catch (error) {

                return res.status(400).json({ error });
            }
        case "POST":
            try {

                const businessExist = await Business.count({ admin: req.body.admin })
                if ((businessExist > 0)) {
                    console.log(businessExist)
                    return res.status(405).json({ success: false, message: "Business already exist", data: businessExist });

                } else {
                    const business = await Business.create(req.body);
                    return res.status(201).json({ success: true, data: business });
                }

            }
            catch (error) {
                console.log(error)

                return res.status(400).json({ success: false });
            }
        case "PUT":
            try {

                const updatedBusiness = await Business.findByIdAndUpdate(req.query.id, req.body, { new: true });
                return res.status(201).json(updatedBusiness);
            }
            catch (error) {

                return res.status(400).json({ success: false });
            }

    }


}