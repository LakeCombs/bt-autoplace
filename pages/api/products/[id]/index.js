import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = nc();

handler.get(async (req, res) => {
	await db.connect();

	const product = await Product.findOne({ _id: req.params.id });

	await db.disconnect();
	res.send(product);
});

export default handler;
