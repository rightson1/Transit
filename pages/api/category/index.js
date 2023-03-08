import db from "../../../models/db";
import Category from "../../../models/Category";
import handleCors from "../../../models/handleCors";
export default async function handler(req, res) {
  const { method } = req;
  await db();
  await handleCors(req, res);
  switch (method) {
    case "POST":
      try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }
    case "GET":
      try {
        const categories = await Category.find({});
        return res.status(200).json(categories);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
      }
    case "PUT":
      try {
        const categories = await Category.findByIdAndUpdate(
          req.query.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json(categories);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const deleted = await Category.findOneAndDelete({ _id: req.query.id });
        return res.status(200).json(deleted);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
}

// const func = (arr, i) => {
//   const x = arr;
//   let n = x.length;

//   if (i >= n) {
//     console.log("i is greater than n");
//     return x;
//   }
//   let j = i;
//   while (!(j >= n)) {
//     if (j >= n - 1) {
//       x.pop();
//       return x;
//     }
//     x[j] = x[j + 1];
//     j++;
//   }
//   return x;
// };

// function deleteTop(stack, i) {
//   const x = stack;
//   let n = x.length;
//   const top = n - 1;
//   if (x[top] !== null) {
//     x.pop();
//     return x;
//   } else {
//     console.log("stack full");
//     return x;
//   }
// }
// function insert(stack, i) {
//   const x = stack;
//   let n = x.length;
//   const top = n - 1;
//   if (x[top] === null) {
//     x.push(i);
//     return x;
//   } else {
//     console.log("stack full");
//     return x;
//   }
// }
