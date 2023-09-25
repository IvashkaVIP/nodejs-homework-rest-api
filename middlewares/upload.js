
const multer = require("multer");
const path = require("path");
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upLoad = multer({ storage: multerConfig });

module.exports = { upLoad };

// app.post("api/users/ava/", upLoad.single("cover"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

