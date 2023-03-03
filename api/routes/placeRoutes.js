const express = require("express");
const multer = require("multer");
const {
    uploadPhotoByLink,
    uploadPhoto,
    addNewPlace,
    getAllPlaces,
    getPlaceById,
    updatePlaceById,
    showPlaces,
    bookingPlace,
    getBookings,
} = require("../controllers/placeControllers");

const placeRoutes = express.Router();
const photoMiddleware = multer({ dest: "uploads" });

placeRoutes.get("/booking", getBookings);
placeRoutes.post("/booking", bookingPlace);
placeRoutes.get("/show", showPlaces);
placeRoutes.get("/", getAllPlaces);
placeRoutes.get("/:id", getPlaceById);
placeRoutes.post("/", addNewPlace);
placeRoutes.put("/", updatePlaceById);
placeRoutes.post("/upload-photo-by-link", uploadPhotoByLink);
placeRoutes.post(
    "/upload-photo",
    photoMiddleware.array("photos", 100),
    uploadPhoto
);

module.exports = placeRoutes;
