import { Router, Request, Response } from 'express';
import { getMessageFromApi } from '../../models/message';

export default async function test(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const message = await getMessageFromApi();
    res.json({ message });
  });
}
