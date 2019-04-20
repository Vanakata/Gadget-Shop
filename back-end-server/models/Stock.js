const mongoose = require("mongoose");

let stockSchema = new mongoose.Schema({

    title: { type: mongoose.Schema.Types.String, required: true, unique: [true, "Stock already exists. "] },
    type: { type: mongoose.Schema.Types.String, required: true },
    manufacturer: { type: mongoose.Schema.Types.String, required: true },
    trailer: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true },
    images: { type: mongoose.Schema.Types.String, required: true },
    likes: [{type: mongoose.Schema.Types.String}]

})
let Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;