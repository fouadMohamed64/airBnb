import { MessageModel } from "../models/messages.model.js";

export let getMessagesByListingId = async (req, res) => {
  try {
    let messages = await MessageModel.find();
    res.status(200).json({ message: "succses", data: messages });
  } catch (err) {
    res.status(400).json({ message: "fail to get messages" });
  }
};
export let addMessagesByListingId = async (req, res) => {
  let newMessage = req.body;
  try {
    await MessageModel.create(newMessage);
    res.status(201).json({ message: "succses", data: newMessage });
  } catch (err) {
    res.status(400).json({ message: "fail to add message" });
  }
};
