import type { NextApiRequest, NextApiResponse } from 'next';

// fake data
import products from 'src/utils/data/products';

export default (req: NextApiRequest, res: NextApiResponse) => {

  // fake loading time
  setTimeout(() => {
    res.status(200).json(products);
  }, 800);
}
