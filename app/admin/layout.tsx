"use client"

import { useSession } from "next-auth/react"
import { Avatar, Button, Spacer, useDisclosure } from "@nextui-org/react"
import { Icon } from "@iconify/react"
import SidebarDrawer from "../components/nextUIPro/sidebar-drawer"
import Sidebar from "../components/nextUIPro/sidebar"
import { sectionItemsWithTeams } from "../components/nextUIPro/sidebar-items"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { data: session, status } = useSession()

    const listMenu = [
        {
            label: "Game",
            icon: "",
            subMenu: [
                {
                    label: "Night Creows",
                    icon: "",
                },
            ],
        },
    ]

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <p>Access Denied. Please log in.</p>
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const content = (
        <div className="relative flex h-full w-72 flex-1 flex-col p-6">
            <div className="flex items-center gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                   xxxx
                </div>
                <span className="text-small font-bold uppercase text-foreground">Acme</span>
            </div>
            <Spacer y={8} />
            <div className="flex items-center gap-3 px-3">
                <Avatar isBordered size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                <div className="flex flex-col">
                    <p className="text-small font-medium text-default-600">John Doe</p>
                    <p className="text-tiny text-default-400">Product Designer</p>
                </div>
            </div>

            <Spacer y={8} />

            <Sidebar defaultSelectedKey="home" items={sectionItemsWithTeams} />

            <Spacer y={8} />
            <div className="mt-auto flex flex-col">
                <Button fullWidth className="justify-start text-default-500 data-[hover=true]:text-foreground" startContent={<Icon className="text-default-500" icon="solar:info-circle-line-duotone" width={24} />} variant="light">
                    Help & Information
                </Button>
                <Button className="justify-start text-default-500 data-[hover=true]:text-foreground" startContent={<Icon className="rotate-180 text-default-500" icon="solar:minus-circle-line-duotone" width={24} />} variant="light">
                    Log Out
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex h-dvh w-full">
            <SidebarDrawer className=" !border-r-small border-divider" isOpen={isOpen} onOpenChange={onOpenChange}>
                {content}
            </SidebarDrawer>
            <div className="w-full flex-1 flex-col p-4">
                <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4">
                    <Button isIconOnly className="flex sm:hidden" size="sm" variant="light" onPress={onOpen}>
                        <Icon className="text-default-500" height={24} icon="solar:hamburger-menu-outline" width={24} />
                    </Button>
                    <h2 className="text-medium font-medium text-default-700">Overview</h2>
                </header>
                <main className="mt-4 w-full overflow-visible">
                    {children}
                </main>
            </div>
        </div>
    )
}
