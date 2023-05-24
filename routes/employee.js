const express=require('express')

const router=express.Router();

const adminController=require('../Controllers/employee')

//create new user
router.post('/create-employee',adminController.createEmployee)

//get the data of  the employee
router.get('/:employee_id',adminController.readEmployeeData)

//update the data of the emplyee
router.post('/update-employee/:employee_id',adminController.updateEmployeeData)

//delete the data of the employee
router.post('/delete-data/:employee_id',adminController.deleteEmployeesData)

//list of employee with pagination
router.get('/employee-list/:page/:perPage',adminController.employeeList)

module.exports=router
