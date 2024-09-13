import { Chip } from "@nextui-org/react"
import { Icon } from "@iconify/react"

import { type SidebarItem, SidebarItemType } from "./sidebar"
import TeamAvatar from "./team-avatar"

export const sectionItems: SidebarItem[] = [
    {
        key: "overview",
        title: "Overview",
        items: [
            {
                key: "dashboard",
                href: "/admin/dashboard",
                icon: "solar:home-2-linear",
                title: "Dashboard",
            },
            {
                key: "projects",
                href: "#",
                icon: "solar:widget-2-outline",
                title: "Projects",
                endContent: <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />,
            },
            {
                key: "tasks",
                href: "#",
                icon: "solar:checklist-minimalistic-outline",
                title: "Tasks",
                endContent: <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />,
            },
            {
                key: "team",
                href: "#",
                icon: "solar:users-group-two-rounded-outline",
                title: "Team",
            },
            {
                key: "tracker",
                href: "#",
                icon: "solar:sort-by-time-linear",
                title: "Tracker",
                endContent: (
                    <Chip size="sm" variant="flat">
                        New{" "}
                    </Chip>
                ),
            },
        ],
    },
    {
        key: "game",
        title: "Game",
        items: [
            {
                key: "nightcrows",
                title: "Night Crows",
                icon: "",
                iconImage: "https://www.nightcrows.com/favicon.ico",
                type: SidebarItemType.Nest,
                items: [
                    {
                        key: "game:nightcrows:token",
                        icon: "ic:outline-generating-tokens",
                        href: "/admin/game/nightcrows/token",
                        title: "Token",
                    },
                    {
                        key: "game:nightcrows:quest",
                        href: "#",
                        icon: "ph:scroll",
                        title: "Quest",
                    },
                    {
                        key: "game:nightcrows:craft",
                        href: "#",
                        icon: "hugeicons:configuration-02",
                        title: "Craft",
                    },
                    {
                        key: "game:nightcrows:emoji",
                        icon: "fluent:sticker-20-regular",
                        href: "/admin/game/nightcrows/emoji",
                        title: "Emoji",
                    },
                    {
                        key: "game:nightcrows:bot",
                        icon: "fluent:bot-sparkle-20-regular",
                        href: "/admin/game/nightcrows/bot",
                        title: "Bot",
                    },
                ],
            },
            {
                key: "analytics",
                href: "#",
                icon: "solar:chart-outline",
                title: "Analytics",
            },
            {
                key: "perks",
                href: "/perks",
                icon: "solar:gift-linear",
                title: "Perks",
                endContent: (
                    <Chip size="sm" variant="flat">
                        3
                    </Chip>
                ),
            },
            {
                key: "expenses",
                href: "#",
                icon: "solar:bill-list-outline",
                title: "Expenses",
            },
            {
                key: "settings",
                href: "/settings",
                icon: "solar:settings-outline",
                title: "Settings",
            },
        ],
    },
]

export const sectionItemsWithTeams: SidebarItem[] = [
    ...sectionItems,
    {
        key: "your-teams",
        title: "Your Teams",
        items: [
            {
                key: "nextui",
                href: "#",
                title: "NextUI",
                startContent: <TeamAvatar name="Next UI" />,
            },
            {
                key: "tailwind-variants",
                href: "#",
                title: "Tailwind Variants",
                startContent: <TeamAvatar name="Tailwind Variants" />,
            },
            {
                key: "nextui-pro",
                href: "#",
                title: "NextUI Pro",
                startContent: <TeamAvatar name="NextUI Pro" />,
            },
        ],
    },
]
