const express = require("express");
const Stock = require("../models/Stock");
const User = require("../models/User");

const router = new express.Router();

router.get("/", (req, res) => {
    User.count({})
        .then(users => {
            Stock.count({})
                .then(products => {
                    res.status(200).json({
                        products,
                        users
                    })
                })
        })

})
module.exports = router;
