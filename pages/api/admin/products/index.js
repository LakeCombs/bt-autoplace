import nc from "next-connect";
import { isAdminMiddleware, isAuthMiddleware } from "../../../../utils/auth";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = nc();
handler.use(isAuthMiddleware, isAdminMiddleware);

handler.get(async (req, res) => {
	await db.connect();
	const products = await Product.find({});
	await db.disconnect();
	res.send(products);
});

handler.post(async (req, res) => {
	await db.connect();
	const newProduct = await Product.create(req.body);
	await db.disconnect();
	res.send({ message: "Product Created", newProduct });
});

export default handler;
