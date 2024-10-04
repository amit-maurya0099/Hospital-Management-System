import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controllers/userController.js";
import express from "express";
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"

const router =express.Router();


router.route("/patient/register").post(patientRegister);
router.route("/login").post(login);
router.route("/admin/logout").get(logoutAdmin);
router.route("/patient/logout").get(logoutPatient);
router.route("/admin/addnew").post(isAdminAuthenticated,addNewAdmin);
router.route("/doctors").get(getAllDoctors);
router.route("/admin/me").get(isAdminAuthenticated,getUserDetails);
router.route("/patient/me").get(isPatientAuthenticated,getUserDetails);
router.route("/doctor/new").post(isAdminAuthenticated,addNewDoctor);



export default router;