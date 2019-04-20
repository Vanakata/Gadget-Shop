const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [],
    date: { type: mongoose.Schema.Types.Date, require: true },
    status: {
        type: mongoose.Schema.Types.String,
        enum: {
            values: ["Pending", "Approved", "Delivered"],
            message: "Status is invalid, valid values inlcude [Pending,Approved,Delivered]."
        },
        default: "Pending",
    }
})
let Order = mongoose.model('Order', orderSchema);
module.exports = Order;