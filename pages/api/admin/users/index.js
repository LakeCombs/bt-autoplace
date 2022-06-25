import nc from 'next-connect';
import { isAdminMiddleware, isAuthMiddleware } from '../../../../utils/auth';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuthMiddleware, isAdminMiddleware);

handler.get(async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});

export default handler;