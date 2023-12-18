import express from 'express'
import UserController from '../controllers/usersControllers.js'
import upload from "../multerconfig/storageConfig.js"
import Auth from "../common/auth.js"
const router = express.Router()

router.post('/signup',UserController.create)
router.post('/login',UserController.login)

// routes
// router.post("/register",upload.single("user_profile"),UserController.userpost);
// router.get("/details",UserController.userget);
// router.get("/user/:id",UserController.singleuserget);
// router.put("/edit/:id",upload.single("user_profile"),UserController.useredit);
// router.delete("/delete/:id",UserController.userdelete);
// router.put("/status/:id",UserController.userstatus);
// router.get("/userexport",UserController.userExport);


router.post("/register",Auth.validate,UserController.registerUser)
router.get("/getdata",UserController.getUserData)
router.get("/getuser/:id",UserController.getIndividualUser)

router.put("/updateuser/:id",UserController.updateUserData)
router.delete("/deleteuser/:id",UserController.deleteUser)
router.post ("/resetpassword",UserController.resetpassword)
router.post("/reset-password",UserController.passwordtoken)

export default router