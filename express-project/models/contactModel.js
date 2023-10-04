const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Id is mandatory"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name."],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email."],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phonenumber."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
