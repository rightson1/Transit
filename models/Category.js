import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    packages: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Category || model("Category", CategorySchema);
