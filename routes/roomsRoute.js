const express = require("express")
const router = express.Router()
const roomController = require("../controllers/roomsController")
const {validationToken,onlyAdmin,userOradmin} = require("../middlewares/validationTokenHandler")

router.post("/",validationToken,onlyAdmin,roomController.CreateRoom)
router.put("/:id",validationToken,onlyAdmin,roomController.UpdateRoom)
router.delete("/:id",validationToken,onlyAdmin,roomController.DeleteRoom)
router.get("/:roomNumber",validationToken,roomController.GetRoom)
router.get("/",validationToken,roomController.GetAllRooms)


module.exports = router