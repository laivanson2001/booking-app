const download = require("image-downloader");
const fs = require("fs");
const Place = require("../models/placeModel");
const jwt = require("jsonwebtoken");
const Booking = require("../models/bookingModel");

const uploadPhotoByLink = async (req, res) => {
    const { photoLink } = req.body;
    const newName = `photo${Date.now()}.jpg`;

    await download.image({
        url: photoLink,
        dest: `${__dirname}/../uploads/${newName}`,
    });

    res.json(newName);
};

const uploadPhoto = (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + `.${ext}`;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    res.json(uploadedFiles);
};

const addNewPlace = (req, res) => {
    const { token } = req.cookies;
    const {
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const place = await Place.create({
            owner: userData.id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        res.json(place);
    });
};

const getAllPlaces = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
};

const getPlaceById = async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
};

const updatePlaceById = (req, res) => {
    const { token } = req.cookies;
    const {
        id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const place = await Place.findById(id);

        if (place.owner.toString() === userData.id) {
            place.set({
                title,
                address,
                photos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            });
            await place.save();
            res.json(place);
        }
    });
};

const showPlaces = async (req, res) => {
    res.json(await Place.find());
};

const bookingPlace = async (req, res) => {
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
        req.body;
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const booking = await Booking.create({
            owner: userData.id,
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price,
        });
        res.json(booking);
    });
};

const getBookings = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        res.json(await Booking.find({ owner: userData.id }).populate("place"));
    });
};

module.exports = {
    uploadPhotoByLink,
    uploadPhoto,
    addNewPlace,
    getAllPlaces,
    getPlaceById,
    updatePlaceById,
    showPlaces,
    bookingPlace,
    getBookings,
};
