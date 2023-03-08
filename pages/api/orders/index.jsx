import axios from "axios";
import db from "../../../models/db";
import handleCors from "../../../models/handleCors";
import Order from "../../../models/Order";
import push from "../../../models/push";
export default async function handler(req, res) {
    const { method } = req;
    await db();
    await handleCors(req, res);
    switch (method) {
        case "POST":
            try {
                // await push.send(req.body.key, "New Order", `${req.body.name} placed a new order,his phone number is ${req.body.phone}`)
                axios.post(`http://xdroid.net/api/message?k=${req.body.key}`, {
                    "c": `From ${req.body.name}, his phone number is ${req.body.phone} and his location  is ${req.body.location}`,
                    "t": "New Order",
                    "u": "https://highrise-blond.vercel.app/"
                })
                axios.post(`http://xdroid.net/api/message?k=${req.body.key2}`, {
                    "c": `From ${req.body.name}, his phone number is ${req.body.phone} and his location  is ${req.body.location}`,
                    "t": "New Order",
                    "u": "https://highrise-blond.vercel.app/"
                })
                const order = await Order.create(req.body);
                return res.status(201).json(order);
            } catch (error) {

                return res.status(400).json({ success: false, error });

            }
        case "GET":
            try {

                if (req.query.business) {
                    const orders = await Order.find({ business: req.query.business, 'date.day': { $gte: Number(req.query?.day - 1) } }).sort({ 'createdAt': -1 })
                    return res.status(200).json(orders);
                } else if (req.query.email) {
                    const orders = await Order.find({ email: req.query.email, 'date.day': { $gte: Number(req.query?.day - 1) } }).sort({ 'createdAt': -1 })
                    return res.status(200).json(orders);
                } else {
                    const orders = await Order.find({ business: req.query.id }).sort({ 'createdAt': 1 }).select('items')
                    return res.status(200).json(orders);
                }
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false });
            }
        case "DELETE":

            try {
                if (req.query.realId) {
                    const deleteOrder = await Order.deleteOne({
                        realId: req.query.realId
                    })
                    return res.status(200).json('success');
                }
            }
            catch (error) {
                return res.status(400).json({ success: false });
            }
        case "PUT":
            try {
                if (req.query.realId) {
                    const updateOrder = await Order.updateOne({
                        realId: req.query.realId
                    }, req.body, {
                        new: true
                    })

                    return res.status(200).json(updateOrder);
                }

            }
            catch (error) {
                return res.status(400).json({ success: false });
            }


    }
}
