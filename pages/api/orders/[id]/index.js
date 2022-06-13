import nc from 'next-connect';
import { isAuthMiddleware } from '../../../../utils/auth';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuthMiddleware)

handler.get(async(req, res) => {
    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.disconnect();
    res.send(order);
});

export default handler;