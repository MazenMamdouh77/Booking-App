const express = require("express")
const router = express.Router()
const hotelsController = require("../controllers/hotelsController")
const {validationToken,onlyAdmin,userOradmin}= require("../middlewares/validationTokenHandler")

router.post("/",validationToken,onlyAdmin,hotelsController.CreateHotel)
router.put("/:id",validationToken,onlyAdmin,hotelsController.UpdateHotel)
router.get("/:id",hotelsController.GetHotel)
router.get("/",hotelsController.GetAll)
router.delete("/:id",validationToken,onlyAdmin,hotelsController.DeleteHotel)

module.exports = router