import express from "express"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import { bookAppointment, deleteAppointment, getAllAppointments, getAppointmentsByEmail, updateAppointmentStatus } from "../controllers/appointmentController.js";

const router=express.Router();

router.route("/book").post(isPatientAuthenticated,bookAppointment)
router.route("/details/email").get(isPatientAuthenticated,getAppointmentsByEmail)
router.route("/all").get(isAdminAuthenticated,getAllAppointments);
router.route("/status/update/:id").put(isAdminAuthenticated,updateAppointmentStatus);
router.route("/status/delete/:id").delete(isAdminAuthenticated,deleteAppointment);

export default router;
