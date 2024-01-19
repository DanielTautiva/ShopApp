import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import UserModel from '../../../models/User';
import connectDB from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDB();

      const { email, password, fullname, address, phone } = req.body;

      // Verifica si el usuario ya existe
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
      }

      // Crea un nuevo usuario
      const newUser = new UserModel({ email, password : await hash(password, 12), fullname, address, phone });
     
      await newUser.save();

      return res.status(201).json({ message: 'Registro exitoso.' });

    } catch (error) {
      return res.status(500).json({ msj: 'Error interno del servidor.', error });
    }
  }
  return res.status(405).json({ msj: 'Método no permitido.' });
}
