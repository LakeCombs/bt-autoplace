import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuthMiddleware } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/util';
import Item from '../../../models/Item';

const handler = nc({
  onError,
});

handler.use(isAuthMiddleware);

handler.get(async (req, res) => {
  await db.connect();

  const allOrder = await Order.find()
    .populate('user')
    .populate('orderItems')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'item',
        model: 'Product',
      },
    })
    .sort({
      createdAt: -1,
    });

  await db.disconnect();
  res.send(allOrder);
});

handler.post(async (req, res) => {
  await db.connect();

  const items = await Item.create([...req.body.items]);

  const newOrder = await Order.create({
    ...req.body,
    orderItems: items?.map((item) => item?._id),
    user: req.user._id,
  });

  await db.disconnect();
  res.status(201).send(newOrder);
});

export default handler;
