import nc from "next-connect";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import db from "../../../utils/db";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
	await db.connect();

	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return res.status(404).send({ message: "User not found, Sign up" });
	}

	const verifyPassword = await bcrypt.compareSync(
		req.body.password,
		user.password
	);

	await db.disconnect();
	if (user && verifyPassword) {
		const token = signToken(user);
		res.send({
			token,
			...user?._doc,
		});
	} else {
		res.status(400).send({ message: "Invalid email or password" });
	}
});

export default handler;
