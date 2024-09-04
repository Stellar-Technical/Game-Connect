"use client"
import { useSession } from "next-auth/react"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react"
import { Button } from "@nextui-org/react"

import { useEffect, useState } from "react"
import { database } from "@/lib/firebase/firebaseConfig"
import { ref, onValue } from "firebase/database"

type NFTDataType = {
    pair: string
    close: number
    change24: number
    change24Color: string
    image?: string
}

export default function OverviewPage() {
    const { data: session, status } = useSession()
    const [nftData, setNftData] = useState<NFTDataType[] | null>(null)
    const [loading, setLoading] = useState(true) // Add loading state
    const [error, setError] = useState(null) // Add error state
    const [changeData, setChangeData] = useState(null)

    useEffect(() => {
        const nftDataRef = ref(database, "nftData")
        const desiredOrder = ["MORION", "PROMOTE", "FEATHER", "GEAR", "TEAR", "PAPYRUS"]

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
                setNftData(Object.values(data)) // Assuming your data is an object that needs to be turned into an array
            } else {
                setNftData(null)
            }
        })

        // Cleanup listener when the component unmounts
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        status === "authenticated" &&
        session.user && (
            <div>
                <h1>Overview Page</h1>
                {session ? (
                    <>
                        <p>Welcome, {session.user?.name}!</p>
                        {nftData && (
                            <>
                                <Button color="primary">Buttonxczzcx</Button>
                                <Table isStriped aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>Pair</TableColumn>
                                        <TableColumn>Price</TableColumn>
                                        <TableColumn>Change (24h)</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {nftData && Array.isArray(nftData) ? (
                                            nftData.map((item, index) => (
                                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                                    <TableCell>
                                                        {" "}
                                                        <User avatarProps={{ radius: "full", src: item.image }} description={""} name={item.pair}>
                                                            {item.pair}
                                                        </User>
                                                    </TableCell>
                                                    <TableCell className={item.change24Color}>{item.close} CROW</TableCell>
                                                    <TableCell className={item.change24Color}>{item.change24}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                                        )}
                                    </TableBody>
                                </Table>
                            </>
                        )}
                    </>
                ) : (
                    <p>You are not logged in</p>
                )}
            </div>
        )
    )
}
