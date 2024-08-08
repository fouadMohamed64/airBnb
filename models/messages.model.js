import mongoose from "mongoose";

const massageSchema = mongoose.Schema(
  {
    listingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Listing",
      required: true,
    },
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model("Message", massageSchema);
