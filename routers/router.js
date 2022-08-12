const { getCarDetail, createCarDetail, updateCarDetail, deleteCarDetail, getCarDatabase, createCarDatabase, updateCarDatabase, deleteCarDatabase, getCarDatabaseLandingPage, getCarMerk, createInspectionReport } = require('../controllers/controller');
const { loginUser, logoutUser, getUser, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const express = require('express');
const router = express.Router();
router.use(express.json());

// GET
router.route('/borongboilapi/getCarDetail').get(getCarDetail);
router.route('/borongboilapi/getCarDatabase').get(getCarDatabase);
router.route('/borongboilapi/getCarDatabaseLandingPage').get(getCarDatabaseLandingPage);
router.route('/borongboilapi/logoutUser').get(logoutUser);
router.route('/borongboilapi/getUser').get(getUser);
router.route('/borongboilapi/getCarMerk').get(getCarMerk);

// POST
router.route('/borongboilapi/loginUser').post(loginUser);
router.route('/borongboilapi/createUser').post(createUser);
router.route('/borongboilapi/createCarDetail').post(createCarDetail);
router.route('/borongboilapi/createCarDatabase').post(createCarDatabase);
router.route('/borongboilapi/createInspectionReport').post(createInspectionReport);

// PATCH
router.route('/borongboilapi/updateCarDetail/:id').patch(updateCarDetail);
router.route('/borongboilapi/updateCarDatabase/:id').patch(updateCarDatabase);
router.route('/borongboilapi/updateUser/:id').patch(updateUser);

// DELETE
router.route('/borongboilapi/deleteCarDetail/:id').delete(deleteCarDetail);
router.route('/borongboilapi/deleteCarDatabase/:id').delete(deleteCarDatabase);
router.route('/borongboilapi/deleteUser/:id').delete(deleteUser);

module.exports = router;