const express=require('express')
const router=express.Router()
const controller=require('../controller/userController')

//UPDATE USER
router.put('/:id',controller.updateUser)
//GET ALL USERS
router.get('/',controller.getAllUsers)
//GET A USER
router.get('/:id',controller.getSingleUser)
//DELETE A USER
router.delete('/:id',controller.deleteUser)
//DISABLE OR ENABLE
router.post('/:id',controller.disabled)


module.exports=router;