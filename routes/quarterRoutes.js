const express = require("express");
const {
  uploadQuarter1,
  getQuarter1,
  getIndividualQuarter1,
} = require("../controller/quarterController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/quarter1").post(isAuthenticatedUser, uploadQuarter1);
router.route("/quarter1/:id").get(getQuarter1);
router.route("/quarter1").get(isAuthenticatedUser, getIndividualQuarter1);

module.exports = router;
