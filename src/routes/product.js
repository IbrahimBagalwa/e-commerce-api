const express = require("express");
const {
  getAllProducts,
  getAllStaticProducts,
} = require("../controllers/products");
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllStaticProducts);

module.exports = router;
