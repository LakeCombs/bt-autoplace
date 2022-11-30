import nc from "next-connect";
import Product from "../../../../../models/Product";
import { isAdminMiddleware, isAuthMiddleware } from "../../../../../utils/auth";
import db from "../../../../../utils/db";

const handler = nc();
handler.use(isAuthMiddleware, isAdminMiddleware);

handler.get(async (req, res) => {
	await db.connect();
	const product = await Product.findById(req.params.id);

	await db.disconnect();
	res.send(product);
});

handler.put(async (req, res) => {
	await db.connect();
	const product = await Product.findById(req.query.id);
	if (product) {
		product.name = req.body.name;
		product.slug = req.body.slug;
		product.price = req.body.price;
		product.category = req.body.category;
		product.image = req.body.image;
		product.brand = req.body.brand;
		product.countInStock = req.body.countInStock;
		product.description = req.body.description;
		await product.save();
		await db.disconnect();
		res.send({ message: "Product Updated Successfully" });
	} else {
		await db.disconnect();
		res.status(404).send({ message: "Product Not Found" });
	}
});

handler.delete(async (req, res) => {
	await db.connect();
	const product = await Product.findById(req.query.id);
	if (product) {
		await product.remove();
		await db.disconnect();
		res.send({ message: "Product Deleted" });
	} else {
		await db.disconnect();
		res.status(404).send({ message: "Product Not Found" });
	}
});

export default handler;
