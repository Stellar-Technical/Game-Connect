import type { NextApiRequest, NextApiResponse } from 'next';
import cron from 'node-cron';
import { fetchAndSaveNFTData } from '../api/pnix/route'

// ตั้งค่า Cron Job ให้ทำงานทุกๆ 1 นาที
cron.schedule('30 * * * *', async () => {
  console.log('Running a task 30 second');
  try {
    await fetchAndSaveNFTData(); // เรียกใช้งานฟังก์ชัน
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Cron job is running' });
}
