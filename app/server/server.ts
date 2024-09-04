import cron from 'node-cron';
import { fetchNFTData } from '../api/pnix/route';


// กำหนด Cron job ที่ทำงานทุก ๆ 30 วินาที
cron.schedule('*/30 * * * * *', () => {
    console.log('Running Cron job at:', new Date().toLocaleTimeString());
    fetchNFTData()
        .then(() => console.log('Fetch NFT data completed.'))
        .catch(error => console.error('Error in Cron job:', error));
});
