import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import UserModel from '../../../models/User';
import connectDB from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDB();

      const { email } = req.body;

      const user = await UserModel.findOne({ email: email });

      return res.status(201).json({ user });

    } catch (error) {
      return res.status(500).json({ msj: 'Error interno del servidor.', error });
    }
  }
  return res.status(405).json({ msj: 'Método no permitido.' });
}
