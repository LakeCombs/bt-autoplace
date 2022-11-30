import mongoose, { Schema, model } from "mongoose";
import Product from "./Product";

const itemModel = new mongoose.Schema({
	item: {
		type: Schema.Types.ObjectId,
		ref: Product,
	},
	count: { type: Number },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemModel);

export default Item;
