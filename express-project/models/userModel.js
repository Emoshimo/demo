const mongooese = require("mongoose");

const userSchema = mongooese.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name."]
    },
    email: {
        type: String,
        required: [true, "Please add the email."],
        unique: [true, "Email address already taken."]
    },
    password: {
        type: String,
        required: [true, "Pleade add the password"]
    },
}, {
    timestamps: true,
});

module.exports = mongooese.model("User", userSchema);