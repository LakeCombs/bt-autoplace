import nc from "next-connect";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import db from "../../../utils/db";
import { isAuthMiddleware, signToken } from "../../../utils/auth";

const handler = nc();
handler.use(isAuthMiddleware);

handler.put(async (req, res) => {
	await db.connect();
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ ...req.body },
		{ new: true }
	);

	await db.disconnect();

	const token = signToken(user);
	res.send({
		token,
		...user?._doc,
	});
});

export default handler;
