import db from "../../../../models/db";
import handleCors from "../../../../models/handleCors";
import Order from "../../../../models/Order";
export default async function handler(req, res) {
  const { method } = req;
  await db();
  await handleCors(req, res);
  switch (method) {
    case "GET":
      try {
        if (req.query.week) {
          console.log(req.query.week);
          const orders = await Order.aggregate([
            {
              $match: {
                business: req.query.business,
                "date.week": Number(req.query.week),
                status: "Delivered",
              },
            },
            {
              $unwind: "$items",
            },
            {
              $group: {
                _id: "$items.name",
                id: { $first: "$items._id" },
                label: { $first: "$items.name" },
                value: { $sum: "$items.qty" },
                total: { $sum: "$items.price" },
              },
            },
          ]);
          return res.status(200).json(orders);
        } else if (req.query.month) {
          const orders = await Order.aggregate([
            {
              $match: {
                business: req.query.business,
              },
            },
            {
              $unwind: "$items",
            },
            {
              $group: {
                _id: "$items.name",
                label: { $first: "$items.name" },
                id: { $first: "$items._id" },
                value: { $sum: "$items.qty" },
                total: { $sum: "$items.price" },
              },
            },
          ]);
          return res.status(200).json(orders);
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }
  }
}
