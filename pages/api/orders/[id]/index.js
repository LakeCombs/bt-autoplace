import nc from "next-connect";
import db from "../../../../utils/db";
import { isAuthMiddleware } from "../../../../utils/auth";
import Order from "../../../../models/Order";

const handler = nc();
handler.use(isAuthMiddleware);

handler.get(async (req, res) => {
	await db.connect();

	const order = await Order.findById(req.query.id)
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
	res.send(order);
});

export default handler;
