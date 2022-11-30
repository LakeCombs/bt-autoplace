import nc from "next-connect";
import db from "../../../utils/db";

const handler = nc();

handler.put(async (req, res) => {
	await db.connect();
	const addToCart = User.findOneAndUpdate(
		{ email: req.body.email },
		{
			$push: {
				cart: req.params.id,
			},
		},
		{ new: true }
	)
		.populate("cart")
		.populate("wishList");

	await db.disconnect();

	res.json(addToCart);
});

export default handler;
