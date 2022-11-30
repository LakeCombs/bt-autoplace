import nc from "next-connect";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import db from "../../../utils/db";
import { isAuthMiddleware, signToken } from "../../../utils/auth";

const handler = nc();
handler.use(isAuthMiddleware);

handler.put(async (req, res) => {
	await db.connect();
	const thisuser = await User.findById(req.user?._id);

	const verifyOldPassword = await bcrypt.compareSync(
		req.body.old_password,
		thisuser?.password
	);

	if (!verifyOldPassword) {
		return res.status(404).json({ error: "Old password is incorrect" });
	}

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hashSync(req.body.new_password, salt);

	const user = await thisuser.save({
		...thisuser,
		password: hashPassword,
	});

	db.disconnect();
	const token = signToken(user);
	res.status(200).json({
		...user?._doc,
		token,
	});
});

export default handler;
