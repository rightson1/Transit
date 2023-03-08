import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },

    description: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        required: true,
    },
    business: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    items: {
        type: Array,
        required: true,
    },
    date: {
        type: Object,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    realId: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    custom: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default models.Order || model("Order", OrderSchema);