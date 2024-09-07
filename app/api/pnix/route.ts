import fetch from 'node-fetch';
import { ref, set } from 'firebase/database';
import { database } from '../../../lib/firebase/firebaseClient';

// import { database, ref, set } from '../../services/firebaseAdmin';

export async function fetchNFTData() {

    const url = 'https://crow-router.pnix.exchange/dex';
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.8',
        'content-type': 'application/json',
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method: 'dex_getBillboard',
            params: [],
        }),
    };

    try {
        const response = await fetch(url, options);
        const result : any = await response.json();

        if (result.result && result.result.length > 0) {
            const transformedResult = result.result.map((item: any) => {
                switch (item.pair) {
                    case "0x8697bed5499737c10ab5adb4bc7952fe457b50e0":
                        item.pair = "TEAR";
                        item.image = "https://cache.pnix.exchange/symbols/TEAR.png";
                        break;
                    case "0x7d82933a4e9ed20dd11008d6a0beaa5c4b0b2687":
                        item.pair = "FEATHER";
                        item.image = "https://cache.pnix.exchange/symbols/FEATHER.png";
                        break;
                    case "0x19690c8ecd26a82853d5a9059480be15dc7884a4":
                        item.pair = "MORION";
                        item.image = "https://cache.pnix.exchange/symbols/MORION.png";
                        break;
                    case "0x2ae7e7cbbcbe04fa274d4f743c15eb1fff2b789c":
                        item.pair = "GEAR";
                        item.image = "https://cache.pnix.exchange/symbols/GEAR.png";
                        break;
                    case "0x9d5949c408ca8a41b5ef322bd078e1b7e16ce628":
                        item.pair = "PAPYRUS";
                        item.image = "https://cache.pnix.exchange/symbols/PAPYRUS.png";
                        break;
                    case "0x0c82e7e5a95a0d599bff88d0b7f7b0ec2b2c2002":
                        item.pair = "PROMOTE";
                        item.image = "https://cache.pnix.exchange/symbols/PROMOTE.png";
                        break;
                }
                return item;
            });

            const timestamp = Date.now();
            await set(ref(database, 'nftData'), transformedResult);
            console.log('Data updated at', new Date(timestamp).toLocaleTimeString());
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}