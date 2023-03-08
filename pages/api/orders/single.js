import db from "../../../models/db";
import handleCors from "../../../models/handleCors";
import Order from "../../../models/Order";
import push from "../../../models/push";
import axios from "axios";
export default async function handler(req, res) {
    const { method } = req;
    await db();
    await handleCors(req, res);
    switch (method) {
        case "GET":
            try {
                const orders = await Order.findById(req.query.id);
                return res.status(200).json(orders);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false });
            }
        case "DELETE":
            try {
                await axios.post(`http://xdroid.net/api/message?k=${req.query.key}`, {
                    c: `${req.query.name}, ${req.body.phone} Cancelled Order`,
                    t: "Order Cancelled",
                    u: "https://highrise-blond.vercel.app/",
                });
                const update = await Order.findByIdAndDelete(req.query.id);
                return res.status(200).json(update);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false, error });
            }
    }
}