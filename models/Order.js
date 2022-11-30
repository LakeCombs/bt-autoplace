import mongoose, { Schema } from "mongoose";
import User from "./User";
import Item from "./Item";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
			required: true,
		},
		orderItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: Item,
			},
		],
		shippingAddress: {
			first_name: {
				type: String,
			},
			last_name: {
				type: String,
			},
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: { type: Object },
		itemsPrice: {
			type: Number,
			required: true,
		},
		shippingCost: {
			type: Number,
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
