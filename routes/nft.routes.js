const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const UserModel = require("../models/User.model");
const NftModel = require("../models/Nft.model");

router.post(
  "/create-nfts",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;

      const createNft = await NftModel.create({
        ...req.body,
        author: loggedInUser._id,
      });

      await NftModel.findOneAndUpdate(
        { _id: loggedInUser._id },
        {
          $push: { nfts: createNft._id },
        },
        { new: true, runValidators: true }
      );

      return res.status(201).json(createNft);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: JSON.stringify(error) });
    }
  }
);

router.get("/my-nfts", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;

    const userNfts = await NftModel.find(
      { author: loggedInUser._id },
      { author: 0 }
    );
    return res.status(200).json(userNfts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});



module.exports = router;


