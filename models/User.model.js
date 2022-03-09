const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  nfts: [{type: mongoose.Types.ObjectId, ref: "NFT"}],
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  }, 


});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
