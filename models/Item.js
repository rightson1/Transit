import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Item || model("Item", ItemSchema);
