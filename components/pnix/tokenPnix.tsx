import { useSession } from "next-auth/react"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"

import { database } from "@/lib/firebase/firebaseClient"
import { ref, onValue } from "firebase/database"

type NFTDataType = {
    pair: string
    close: number
    change24: number
    change24Color: string
    image?: string
}

export default function TokenPnix() {
    const { data: session, status } = useSession()
    const [nftData, setNftData] = useState<NFTDataType[] | null>(null)
    const [loading, setLoading] = useState(true) // Add loading state
    const [error, setError] = useState(null) // Add error state
    const [changeData, setChangeData] = useState(null)

    useEffect(() => {
        const nftDataRef = ref(database, "nftData")
        const desiredOrder = ["MORION", "PROMOTE", "FEATHER", "GEAR", "TEAR", "PAPYRUS"]
        console.log(nftData)

        // Listen for changes in the database in real-time
        const unsubscribe = onValue(nftDataRef, (snapshot) => {
            const data = snapshot.val()
            const sortedData = data.sort((a: NFTDataType, b: NFTDataType) => {
                const indexA = desiredOrder.indexOf(a.pair)
                const indexB = desiredOrder.indexOf(b.pair)
                return (indexA === -1 ? Number.MAX_VALUE : indexA) - (indexB === -1 ? Number.MAX_VALUE : indexB)
            })
            data.map((item: any, index: any) => ((item.change24 = item.low ? (((item.close - item.prev) / item.prev) * 100).toFixed(2) : "N/A"), (item.change24Color = item.change24 != "N/A" && parseFloat(item.change24) > 0 ? "text-green-500" : parseFloat(item.change24) < 0 ? "text-red-500" : "")))
            if (data) {
                setLoading(false)
                setNftData(Object.values(data)) // Assuming your data is an object that needs to be turned into an array
                
            } else {
                setLoading(true)
                setNftData(null)
            }
        })

        // Cleanup listener when the component unmounts
        return () => {
            unsubscribe()
        }
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        status === "authenticated" &&
        session.user && (
            <div>
                {session ? (
                    <>
                        {nftData ? (
                            <>
                                <Table isStriped aria-label="Token Night Crows">
                                    <TableHeader>
                                        <TableColumn>Pair</TableColumn>
                                        <TableColumn>Price</TableColumn>
                                        <TableColumn>Change (24h)</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {nftData && Array.isArray(nftData) ? (
                                            nftData.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {" "}
                                                        <User avatarProps={{ radius: "full", src: item.image }} description={""} name={item.pair}>
                                                            {item.pair}
                                                        </User>
                                                    </TableCell>
                                                    <TableCell className={item.change24Color}>{item.close} CROW</TableCell>
                                                    <TableCell className={item.change24Color}>{item.change24}%</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                                        )}
                                    </TableBody>
                                </Table>
                            </>
                        ) : (
                            <Table aria-label="Example empty table">
                                <TableHeader>
                                    <TableColumn>Pair</TableColumn>
                                    <TableColumn>Price</TableColumn>
                                    <TableColumn>Change (24h)</TableColumn>
                                </TableHeader>
                                <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                            </Table>
                        )}
                    </>
                ) : (
                    <p>You are not logged in</p>
                )}
            </div>
        )
    )
}
