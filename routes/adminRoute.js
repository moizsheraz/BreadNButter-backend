const express = require("express");
const {
  editIncomeStatement,
  getAllUsers,
  getIndividualQuarter1Admin,
  getIndividualQuarter2Admin,
  createQuarter2,
  getAllIncomeStatements,
  updateQuarter2,
} = require("../controller/adminController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/editIncomeStatement").put(editIncomeStatement);
router.route("/getAllUser").get(getAllUsers);
router
  .route("/admin/getIndividualQuarter1/:id")
  .get(getIndividualQuarter1Admin);
router
  .route("/admin/getIndividualQuarter2/:id")
  .get(getIndividualQuarter2Admin);
router.route("/admin/createQuarter2").post(createQuarter2);
router.route("/admin/updateQuarter2").put(updateQuarter2);

router
  .route("/admin/IncomeStatement")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllIncomeStatements);

module.exports = router;

// authorizedRole("admin"),
