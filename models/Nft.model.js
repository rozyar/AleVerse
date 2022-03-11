const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const nftSchema = new Schema ({ 
    title: {type: 'String', MaxLength:20, required: true, trim: true},
    text: {type: 'String', MaxLength:64, required: true, trim:true},
    price: {type: Number, required: true, trim:true}, 
    nftPicture: {type: 'String'},
    author: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})
const NftModel = model("Nft", nftSchema);

module.exports = NftModel;