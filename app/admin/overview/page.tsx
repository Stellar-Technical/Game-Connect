"use client"
import { useSession } from "next-auth/react"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import { Button } from "@nextui-org/react"

import { useEffect, useState } from "react"
import { db, app } from "@/app/services/firebase"
import { getDatabase, ref, onValue, off } from "firebase/database"

type NFTDataType = {
    pair: string
    close: number
    change24: number
    change24Color: string
}

export default function OverviewPage() {
    const { data: session, status } = useSession()
    const [nftData, setNftData] = useState<NFTDataType[] | null>(null)
    const [loading, setLoading] = useState(true) // Add loading state
    const [error, setError] = useState(null) // Add error state
    const [changeData, setChangeData] = useState(null)

    useEffect(() => {
        const nftDataRef = ref(db, "nftData")
        // const desiredOrder = ["morion", "promote", "tear", "feather", "gear", "papyrus"]
        const desiredOrder = ["MORION", "PROMOTE", "TEAR", "FEATHER", "GEAR", "PAPYRUS"]

        // Listen for changes in the database in real-time
        const unsubscribe = onValue(nftDataRef, (snapshot) => {
            const data = snapshot.val()
            const sortedData = data.sort((a: NFTDataType, b: NFTDataType) => {
                const indexA = desiredOrder.indexOf(a.pair)
                const indexB = desiredOrder.indexOf(b.pair)
                return (indexA === -1 ? Number.MAX_VALUE : indexA) - (indexB === -1 ? Number.MAX_VALUE : indexB)
            })
            data.map((item: any, index: any) => ((item.change24 = item.low ? (((item.close - item.prev) / item.prev) * 100).toFixed(2) : "N/A"), (item.change24Color = item.change24 != "N/A" && parseFloat(item.change24) > 0 ? "text-green-500" : parseFloat(item.change24) < 0 ? "text-red-500" : ""), console.log(item)))
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
                                <Button color="primary">Button</Button>
                                <Table isStriped aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>ROLE</TableColumn>
                                        <TableColumn>STATUS</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key="1">
                                            <TableCell>Tony Reichert</TableCell>
                                            <TableCell>CEO</TableCell>
                                            <TableCell>Active</TableCell>
                                        </TableRow>
                                        <TableRow key="2">
                                            <TableCell>Zoey Lang</TableCell>
                                            <TableCell>Technical Lead</TableCell>
                                            <TableCell>Paused</TableCell>
                                        </TableRow>
                                        <TableRow key="3">
                                            <TableCell>Jane Fisher</TableCell>
                                            <TableCell>Senior Developer</TableCell>
                                            <TableCell>Active</TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell>William Howard</TableCell>
                                            <TableCell>Community Manager</TableCell>
                                            <TableCell>Vacation</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                {/* <div className="overflow-x-auto">
                                    <Table>
                                        <Table.Head>
                                            <Table.HeadCell>Pair</Table.HeadCell>
                                            <Table.HeadCell>Price</Table.HeadCell>
                                            <Table.HeadCell>Change (24h)</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {nftData && Array.isArray(nftData) ? (
                                                nftData.map((item, index) => (
                                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.pair || "Unknown Name"}</Table.Cell>
                                                        <Table.Cell className={item.change24Color}> {item.close || "Unknown Name"} CROW</Table.Cell>
                                                        <Table.Cell className={item.change24Color}> {item.change24}</Table.Cell>
                                                    </Table.Row>
                                                ))
                                            ) : (
                                                <p>No data available</p>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </div> */}
                            </>
                        )}
                        {/* {token} */}
                    </>
                ) : (
                    <p>You are not logged in</p>
                )}
            </div>
        )
    )
}
