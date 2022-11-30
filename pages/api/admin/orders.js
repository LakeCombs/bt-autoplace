import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuthMiddleware, isAdminMiddleware } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/util";

const handler = nc({
	onError,
});
handler.use(isAuthMiddleware, isAdminMiddleware);

handler.get(async (req, res) => {
	await db.connect();

	const orders = await Order.find()
		.populate("user")
		.populate("orderItems")
		.populate({
			path: "orderItems",
			populate: {
				path: "item",
				model: "Product",
			},
		})
		.sort({
			isDelivered: false,
			updatedAt: "asc",
		});

	await db.disconnect();
	res.send(orders);
});

export default handler;
