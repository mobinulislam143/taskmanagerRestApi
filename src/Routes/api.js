const express = require('express')
const router = express.Router()
const AuthverifyMiddleware = require('../middleware/Authverifymiddleware')
const userController = require('../controller/userController')
const TaskController = require('../controller/TaskController')

//user Manage
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/profileDetails', AuthverifyMiddleware, userController.profileDetails)
router.post('/profileUpdate',AuthverifyMiddleware, userController.profileUpdate)
router.get('/RecoverVerifyEmail/:email', userController.RecoverVerifyEmail)
router.get('/RecoverVerifyOtp/:email/:otp', userController.RecoverVerifyOtp)
router.post('/RecoverResetPass', userController.RecoverResetPass)


router.get('/demo', userController.demo)

//task Manage
router.post('/createTask', AuthverifyMiddleware, TaskController.createTask)
router.get('/readTask', AuthverifyMiddleware, TaskController.readTask)
router.post("/updateTaskStatus/:id/:status",AuthverifyMiddleware, TaskController.updateTaskStatus)
router.get('/listTaskByStatus/:status', AuthverifyMiddleware, TaskController.listTaskByStatus)
// router.get('/taskStatusCount', AuthverifyMiddleware, TaskController.taskStatusCount)
router.post('/deleteTask/:id', AuthverifyMiddleware, TaskController.deleteTask)


module.exports = router