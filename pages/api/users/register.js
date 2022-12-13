import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const salt = await bcrypt.genSalt(10);
  const password = bcrypt.hashSync(req.body.password, salt);
  const user = new User({ ...req.body, password });

  const newUser = await user.save();

  await db.disconnect();
  const token = signToken(newUser);

  res.status(200).json({
    ...newUser?._doc,
    token,
  });
});

export default handler;
