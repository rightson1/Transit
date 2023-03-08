import { Schema, model, models } from "mongoose";

const BusinessSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

export default models.Business || model("Business", BusinessSchema);