import React from "react"
import { AvatarGroup } from "@nextui-org/react"
const Emoji: { duck: string[] }[] = [
    {
        duck: ["https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038256230-8a8c0d00-6f97-46c6-b46b-4e9a5eefdc8f.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038281986-1e657e35-a28b-4df5-b68f-7d42792f2ed9.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038288556-b826cd80-b71e-4ff8-9767-f8a30521df77.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038295815-1be197ca-4782-4070-b758-30c981585dd7.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038303631-d1d73afe-1b1a-46fb-962e-8f5255e2f44c.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038325201-188508b0-adfe-4561-8dda-28a98b358b0a.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038331957-57f71716-b1f5-4d7e-b644-c0a8148ed827.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038338416-969a522c-f023-492b-b0ad-a15f19883b5f.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038344773-a3752b6c-c94d-4a95-a5d6-f5efcc32ee3c.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038350551-9099d7ba-4fed-4a53-a667-06c768db14e0.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038368086-1371112b-a695-41f2-a3c1-3c61fb526c1e.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038374324-a0e4351d-0994-4a93-9e9e-8718ff2eeb4f.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038380951-794a52e4-bd97-4202-bc53-e0bcef8b154d.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038387188-7dd74d7e-a7b7-48f7-b75f-7b390ac24d0e.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038393284-aad49717-10af-46c1-a8a7-88bdd65c01bc.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038410450-c164bf2e-b85f-48d0-82d6-e42cfb98680a.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038417767-5d83b21d-1b55-43fc-b5f3-f0ce3c88503f.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038423161-55e05460-a024-40bd-8ff1-9bd758921253.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038429709-33074854-1a2e-4263-bda9-194b5824e239.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038435620-a2479d5f-e9a6-4361-9d12-c4f13ab98372.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726039608143-ce77b556-8828-4f79-af72-82f849f69790.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038456814-83457a8a-577b-480e-9c62-31746e7e41f6.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038462304-91b601ec-498a-4331-973e-5c5cc5ada5f6.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038467085-f0587b65-6662-4c2b-85a0-8391c7593d2c.png", "https://dev-file.nightcrows.co.kr/upload/beta/helpInquiry/3/1726038474380-a21f712e-e750-40f2-b838-b6eee4fc3678.png"],
    },
]

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

function page() {
    return (
        <div>
            {Emoji.map((item, index) => (
                <div key={index}>
                    {chunkArray(item.duck, 5).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-4 justify-center mb-4">
                            {row.map((url, idx) => (
                                <img key={idx} src={url} alt={`Duck Emoji ${idx + 1}`} style={{ width: "100px", height: "100px" }} />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default page
