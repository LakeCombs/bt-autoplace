import nc from 'next-connect';
import Product from '../../../models/Product';
import { isAuthMiddleware, isAdminMiddleware } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/util';

const handler = nc({
  onError,
});
handler.use(isAuthMiddleware, isAdminMiddleware);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;