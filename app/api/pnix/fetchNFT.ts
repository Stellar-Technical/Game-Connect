import axios from 'axios';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// ตรวจสอบว่า admin ถูก initialised หรือไม่
if (!admin.apps.length) {
  const serviceAccount: ServiceAccount = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

const db = admin.database();

// ฟังก์ชันในการดึงข้อมูลจาก API
export const fetchDataNFT = async (): Promise<void> => {
    const url = 'https://crow-router.pnix.exchange/dex';
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.8',
        'content-type': 'application/json',
    };

    const payload = {
        id: 1,
        jsonrpc: '2.0',
        method: 'dex_getBillboard',
        params: []
    };

    console.log(payload);

    try {
        // ดึงข้อมูลจาก API ด้วย axios
        const response = await axios.post(url, payload, { headers });
        const result = response.data.result;

        // ตรวจสอบว่ามีข้อมูล result หรือไม่
        if (result && result.length > 0) {
            // เรียงลำดับข้อมูลและแทนที่ค่า pair
            const updatedResult = result.map((item: any) => {
                switch (item.pair) {
                    case "0x8697bed5499737c10ab5adb4bc7952fe457b50e0":
                        item.pair = "TEAR";
                        break;
                    case "0x7d82933a4e9ed20dd11008d6a0beaa5c4b0b2687":
                        item.pair = "FEATHER";
                        break;
                    case "0x19690c8ecd26a82853d5a9059480be15dc7884a4":
                        item.pair = "MORION";
                        break;
                    case "0x2ae7e7cbbcbe04fa274d4f743c15eb1fff2b789c":
                        item.pair = "GEAR";
                        break;
                    case "0x9d5949c408ca8a41b5ef322bd078e1b7e16ce628":
                        item.pair = "PAPYRUS";
                        break;
                    case "0x0c82e7e5a95a0d599bff88d0b7f7b0ec2b2c2002":
                        item.pair = "PROMOTE";
                        break;
                }
                return item;
            });

            // อ้างอิงตำแหน่งใน Firebase Realtime Database
            const ref = db.ref('nft_data');
            await ref.set(result);

            console.log('NFT data saved successfully!');
        }

    } catch (error) {
        console.error('Error fetching NFT data:', error);
    }
};
