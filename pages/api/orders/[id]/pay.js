import nc from "next-connect";
import { isAuthMiddleware } from "../../../../utils/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import { onError } from "../../../../utils/util";

const handler = nc({
	onError,
});
handler.use(isAuthMiddleware);

handler.put(async (req, res) => {
	await db.connect();
	const order = await Order.findById(req.query.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = { ...req.body };

		const paidOrder = await order.save();
		await db.disconnect();
		res.send({ message: "order successfully paid", order: paidOrder });
	} else {
		await db.disconnect();
		res.status(404).send({ message: "order not found" });
	}
});

export default handler;
