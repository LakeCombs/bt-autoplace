import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuthMiddleware } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/util";

const handler = nc({
  onError,
});

handler.use(isAuthMiddleware);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({ ...req.body, user: req.user._id });
  const order = await newOrder.save();
  res.status(201).send(order);
  await db.disconnect();
  res.send(products);
});

export default handler;
