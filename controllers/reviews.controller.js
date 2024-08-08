import { ReviewModel } from "../models/reviews.model.js";

export let getReviewsByListingId = async (req, res) => {
  try {
    let reviews = await ReviewModel.find();
    res.status(200).json({ message: "sucsses", data: reviews });
  } catch (err) {
    res.status(400).json({ message: "fail to get reviews" });
  }
};
export let addReviewsByListingId = async (req, res) => {
  let newReview = req.body;
  try {
    await ReviewModel.create(newReview);
    res.status(201).json({ message: "succses", data: newReview });
  } catch (err) {
    res.status(400).json({ message: "fail to add review" });
  }
};
