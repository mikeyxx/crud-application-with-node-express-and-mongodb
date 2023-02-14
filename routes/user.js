const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/user");

router.route("/").post(createUser).get(getAllUser);
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
