const express = require("express");
const authCheck = require("../config/auth-check");
const Stock = require("../models/Stock");

const router = new express.Router();

function validateStockCreateForm(payload) {

    const errors = {};
    let message = "";
    let isFormValid = true;

    payload.price = parseFloat(payload.price);

    if (!payload || typeof payload.title !== "string" || payload.title.length < 3) {

        isFormValid = false;
        errors.name = "Title must be at least 3 symbols";
    }
    if (!payload || typeof payload.type !== "string" || payload.type.length < 3) {

        isFormValid = false;
        errors.name = "Type of the product must be at least 3 symbols";
    }
    if (!payload || typeof payload.manufacturer !== "string" || payload.manufacturer.length < 3) {

        isFormValid = false;
        errors.name = "Manufacturer of the product must be at least 3 symbols";
    }
    if (!payload || typeof payload.trailer !== "string" || !(payload.trailer.startsWith("https://") || payload.trailer.startsWith("http://"))) {
       
        
        isFormValid = false;
        errors.name = "Invalid URL";
    }
    if (!payload || typeof payload.description !== "string" || payload.description.length < 14) {
        isFormValid = false;
        errors.name = "Description must be at least 14 characters long"
    }
    if (!payload || payload.price < 0) {
        isFormValid = false;
        errors.name = "Price must be, a positive number"
    }
    if (!payload || typeof payload.images !== "string" || !(payload.images.startsWith("https://") || payload.images.startsWith("http://"))) {
       
        
        isFormValid = false;
        errors.name = "Invalid URL";
    }

    if (!isFormValid) {
        message = "Check the form and correct the errors"
    }
    return {
        success: isFormValid,
        message,
        errors
    }


}

router.post("/create", authCheck, (req, res) => {
    
    const stockObj = req.body;
    

    if (req.user.roles.indexOf("Admin") > -1) {
        let validationResult = validateStockCreateForm(stockObj);
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors,
            })
        }

        Stock
            .create(stockObj)
            .then((createStock) => {
                res.status(200).json({
                    success: true,
                    message: "Product successfully created",
                    data: createStock
                })
            })
            .catch((err) => {
                console.log(err);
                let message = "Something went wrong! Check the form for errors."
                if (err.code === 11000) {
                    message = "Product with the given name already exists."
                }
                return res.status(200).json({
                    success: false,
                    message: message
                })
            })

    } else {
        return res.status(200).json({
            success: false,
            message: 'Invalid credentials'
        })
    }
})
router.post("/edit/:id", authCheck, (req, res) => {

    if (req.user.roles.indexOf("Admin" > -1)) {
        const stockId = req.params.id;
        const stockObj = req.body;
        const validationResult = validateStockCreateForm(stockObj);
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        };
        Stock.findById(stockId)
            .then(existingStock => {
                existingStock.title = stockObj.title;
                existingStock.type = stockObj.type;
                existingStock.manufacturer = stockObj.manufacturer;
                existingStock.trailer = stockObj.traiiler;
                existingStock.description = stockObj.description;
                existingStock.price = stockObj.price;
                existingStock.images = stockObj.images;

                existingStock
                    .save()
                    .then(editedStock => {
                        res.status(200).json({
                            success: true,
                            message: "Product was edited successfuly!",
                            data: editedStock,
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        let message = "Something went wrong.Please check the forms for errors"
                        if (err.code === 11000) {

                            message = "Product with the given name already exists!"
                        }
                        return res.status(200).json({
                            success: false,
                            message,
                        })
                    })
            })
            .catch((err) => {
                console.log(err);
                const message = "Something went wrong.Please check the forms for errors"
                return res.status(200).json({
                    success: false,
                    message,
                })
            })
    } else {

        return res.status(200).json({
            success: false,
            message: "Invalid credentials!"
        })
    }
})
router.get("/all", (req, res) => {

    Stock
        .find()
        .then(products => {

            res.status(200).json(products)
        })
})
router.post("/like/:id", authCheck, (req, res) => {
    const id = req.params.id;
    const username = req.user.username;
    Stock
        .findById(id)
        .then(product => {
            if (!product) {
                const message = "Product not found";
                return res.status(200).json({
                    success: false,
                    message,
                })
            }
            let likes = product.likes;
            if (!likes.includes(username)) {

                likes.push(username);
            }
            product.likes = likes;
            product
                .save()
                .then((product) => {
                    res.status(200).json({
                        success: true,
                        message: "Product liked successfuly",
                        data: product,
                    })
                })
                .catch((err) => {
                    console.log(err);
                    const message = 'Something went wrong!'
                    return res.status(200).json({
                        success: false,
                        message,
                    })
                })
        })
        .catch((err) => {
            console.log(err);
            const message = 'Something went wrong!'
            return res.status(200).json({
                success: false,
                message,
            })
        })
})
router.post("/unlike/:id", authCheck, (req, res) => {
    const id = req.params.id;
    const username = req.user.username;

    Stock.findById(id)
        .then(stock => {
            if (!stock) {
                let message = "Product not found"
                return res.status(200).json({
                    success: false,
                    message,
                })
            }
            let likes = stock.likes
            if (likes.includes(username)) {
                const index = likes.indexOf(username);
                likes.splice(index, 1)
            }
            stock.likes = likes;
            stock.save()
                .then((stock) => {
                    res.status(200).json({
                        success: true,
                        message: "You unlike this product",
                        data: stock
                    })
                })
                .catch(err => {
                    console.log(err);
                    const message = "Something went wrong"
                    res.status(200).json({
                        success: false,
                        message,
                    })

                })
                .catch(err => {
                    console.log(err);
                    res.status(200).json({
                        success: false,
                        message,
                    })
                })
        })
})
router.delete("/delete/:id", authCheck, (req, res) => {

    const id = req.params.id;
    if (req.user.roles.indexOf("Admin") > -1) {

        Stock.findById(id)
        .then((stock)=>{
            stock.remove()
            .then(()=>{
                return res.status(200).json({
                    success:true,
                    message:"Product successfuly deleted",
                })
            })
        }).catch(err=>{
            console.log(err);
            return res.status(200).json({
                success:false,
                message:"Entry does not exist"
            });
            
        })
    }else{
        return res.status(200).json({
            success:false,
            message:"Invalid credentials"
        });
    }
})
module.exports = router;