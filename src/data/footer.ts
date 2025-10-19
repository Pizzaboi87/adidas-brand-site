export type SocialItem = {
    name: string;
    icon: string;
    href: string;
}

export type MenuItem = {
    title: string;
    links: string[];
}

export type ContactItem = {
    icon: string;
    text: string;
    href?: string;
    isAddress?: boolean;
}

export const socialLinks: SocialItem[] = [
    { name: "Facebook", icon: "mdi:facebook", href: "https://www.facebook.com/adidas" },
    { name: "Instagram", icon: "mdi:instagram", href: "https://www.instagram.com/adidas" },
    { name: "X (Twitter)", icon: "carbon:logo-x", href: "https://x.com/adidas" },
    { name: "YouTube", icon: "mdi:youtube", href: "https://www.youtube.com/adidas" },
    { name: "Pinterest", icon: "mdi:pinterest", href: "https://www.pinterest.com/adidas" },
]

// Footer menu sections
export const menuSections: MenuItem[] = [
    {
        title: "Company",
        links: [
            "About Adidas",
            "Sustainability",
            "Press",
            "Careers",
        ],
    },
    {
        title: "Support",
        links: [
            "Help & FAQs",
            "Order Tracker",
            "Returns & Exchanges",
            "Contact Us",
        ],
    },
    {
        title: "Legal",
        links: [
            "Terms & Conditions",
            "Privacy Policy",
            "Cookie Settings",
            "Imprint",
        ],
    },
]

// Contact information
export const contactItems: ContactItem[] = [
    {
        icon: "mdi:email-outline",
        text: "support@adidas.com",
        href: "mailto:support@adidas.com",
    },
    {
        icon: "mdi:phone-outline",
        text: "+49 9132 840",
        href: "tel:+499132840",
    },
    {
        icon: "mdi:map-marker-outline",
        text: "Adi-Dassler-Strasse 1, Herzogenaurach, 91074 Germany",
        isAddress: true,
    },
]
