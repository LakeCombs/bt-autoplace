import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuthMiddleware, isAdminMiddleware } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/util';

const handler = nc({
  onError,
});
handler.use(isAuthMiddleware, isAdminMiddleware);

handler.get(async (req, res) => {
  await db.connect();
//   populate the user object with the name only alongside the id
  const orders = await Order.find({}).populate('user', 'name');
  await db.disconnect();
  res.send(orders);
});

export default handler;