import type { NextApiRequest, NextApiResponse } from 'next';
import cron from 'node-cron';
import { fetchDataNFT } from '../api/pnix/fetchNFT';

// ตั้งค่า Cron Job ให้ทำงานทุกๆ 1 นาที
cron.schedule('* * * * *', async () => {
  console.log('Running a task every minute');
  await fetchDataNFT();
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Cron job is running' });
}
