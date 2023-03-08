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
        if (req.query.search) {
          const items = await Item.aggregate([
            {
              $match: {
                business: req.query.id,
                name: { $regex: req.query.search, $options: "i" },
              },
            },
          ]).limit(10);
          return res.status(200).json(items);
        } else {
          console.log(req.query);
          const items = await Item.find({
            business: req.query.id,
          }).select("name");
          return res.status(200).json(items);
        }
      } catch (error) {
        return res.status(400).json({ success: error });
      }
  }
}
