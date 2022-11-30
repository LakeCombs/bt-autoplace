import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuthMiddleware } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/util";

const handler = nc({
	onError,
});
handler.use(isAuthMiddleware);

handler.get(async (req, res) => {
	await db.connect();
	const orders = await Order.find({ user: req.user._id })
		.populate("user")
		.populate("orderItems")
		.populate({
			path: "orderItems",
			populate: {
				path: "item",
				model: "Product",
			},
		});

	await db.disconnect();

	res.send(orders);
});

export default handler;
