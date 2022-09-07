const multer = require("multer");

const upload = multer({
  dest: "../public",
});

exports.uploadImage = upload.single("photo");

exports.upload = (req, res) => {
  console.log(req.body)
  res.status(200).send(req.photo)
}