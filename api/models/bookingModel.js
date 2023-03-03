const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            require: true,
        },
        checkIn: { type: Date, require: true },
        checkOut: { type: Date, require: true },
        numberOfGuests: { type: Number, require: true },
        name: { type: String, require: true },
        phone: { type: String, require: true },
        price: Number,
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
