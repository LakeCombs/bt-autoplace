import jwt from "jsonwebtoken";

const signToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "30d" }
	);
};

const isAuthMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;
	if (authorization?.startsWith("Bearer")) {
		const token = authorization.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: "Token is invalid" });
			} else {
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(401).send({ message: "Token is not available" });
	}
};

const isAdminMiddleware = async (req, res, next) => {
	if (req.user.isAdmin) {
		next();
	} else {
		res.status(401).send({ message: "User is not admin" });
	}
};
export { signToken, isAuthMiddleware, isAdminMiddleware };
