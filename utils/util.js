import db from './db';

export const getError = err => err?.response?.data?.message ?? err?.message ?? 'An error has occurred';

export const roundToTwoSig = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

// handles error for the backend db
export const onError = async (err, req, res, next) => {
    await db.disconnect();
    res.status(500).send({message: err.toString()})
}