import db from "../../../models/db";
import handleCors from "../../../models/handleCors";
import Item from "../../../models/Item";
export default async function handler(req, res) {
  const { method } = req;
  await db();

  await handleCors(req, res);

  switch (method) {
    case "POST":
      try {
        const item = await Item.create(req.body);
        return res.status(201).json(item);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
      }
    case "GET":
      console.log(req.query);
      try {
        if (req.query.category) {
          const items = await Item.aggregate([
            { $match: { category: req.query.category } },
          ]);
          return res.status(200).json(items);
        } else if (req.query.search) {
          const items = await Item.aggregate([
            { $match: { name: { $regex: req.query.search, $options: "i" } } },
          ]);
          return res.status(200).json(items).limit(10);
        } else if (req.query.id) {
          const item = await Item.findById(req.query.id);
          return res.status(200).json(item).limit(10);
        } else {
          const items = await Item.find({});
          return res.status(200).json(items);
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
      }
    case "PUT":
      try {
        const items = await Item.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
        });

        return res.status(200).json(items);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const deletedItem = await Item.deleteOne({ _id: req.query.id });
        return res.status(200).json(deletedItem);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
}
