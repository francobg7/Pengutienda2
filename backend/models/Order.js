import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);