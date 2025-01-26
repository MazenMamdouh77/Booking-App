const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { validationToken,onlyAdmin,userOradmin} = require("../middlewares/validationTokenHandler.js");

router.get("/current", validationToken,usersController.CurrentUser);
router.put("/:id",validationToken,userOradmin,usersController.UpdateUser);
router.get("/:id",validationToken,onlyAdmin,usersController.GetUser);
router.get("/",validationToken,onlyAdmin,usersController.GetAll);
router.delete("/:id",validationToken,onlyAdmin,usersController.DeleteUser);

module.exports = router;
