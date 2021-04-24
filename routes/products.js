var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const firebase = require('../services/firebase');
const collectionId = "product";

router.get('/' , asyncHandler( async ( req, res, next) => {
    //Bussiness Logic
    const products = await firebase.getCollection(collectionId);
    return res.json({
        products : products
    })
}));

router.post('/new', asyncHandler( async (req , res, next) => {
    //Bussiness Logic
    try{
        const payload = req.body; //Get Request Body
        const documentId = payload.productName;
        const status = await firebase.setDocument(collectionId, documentId, payload);
        //console.log(payload);
        return res.json({
            status: status
        });
    } catch ( error ) {
        console.error(error);
        return res.json({
            status: 500
        });
    }
}));

module.exports = router;