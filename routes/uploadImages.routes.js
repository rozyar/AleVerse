const router = require("express").Router();

const uploadCloud = require("../config/cloudinary.config");

router.post("/", uploadCloud.single("nftp"), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ message: "Upload falhou" });
  }

  return res.status(201).json({ url: req.file.path });
});

module.exports = router;