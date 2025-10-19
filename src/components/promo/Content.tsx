import Figure from "@/components/promo/Figure";
import ScatterLogo from "@/components/promo/ScatterLogo";
import Info from "./Info";
import { partners, payments } from "@/data/partners";

const Content = () => (
    <main className="bg-white relative overflow-hidden">
        {/* scattered background logos */}
        <ScatterLogo />

        {/* Hero Section */}
        <div className="relative pb-24 bg-gradient-to-br from-amber-400 via-orange-300 to-amber-500 overflow-hidden">
            <div className="lg:container xl:max-w-7xl flex flex-col gap-y-24 mx-auto px-8 py-4 relative">

                {/* Section 1 - Text left / Image right */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                    <Info
                        titleTop="YEAR END"
                        titleBottom="SUPER SALE"
                        text="Join adiClub and unlock an exclusive 40% promo code to use at our official retail partners. Don’t miss this chance to upgrade your Adidas collection with incredible savings!"
                        icons={partners}
                        button={{
                            text: "Join adiClub",
                            link: "https://www.adidas.com/us/adiclub",
                            note: "Prices, availability, and discount applications may vary by retailer. See each partner’s website for full terms and conditions.",
                        }}
                    />

                    <Figure
                        src="/promo/shopping-woman.webp"
                        alt="Happy woman with Adidas shopping bags"
                    />
                </div>

                {/* Section 2 - Image left / Text right */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
                    <Figure
                        src="/promo/shopping-man.webp"
                        alt="Happy man with Adidas shopping bags"
                        extraClass="justify-self-start"
                    />

                    <Info
                        titleTop="EASY PAYMENTS"
                        titleBottom="GREAT STYLE"
                        text="Shop your favorite Adidas gear now and pay later with exclusive installment plans. Thanks to our partners Affirm, Afterpay, Klarna, and TBI Bank, you can enjoy a smoother checkout and more time to pay - without compromising on your style."
                        icons={payments}
                    />
                </div>
            </div>
        </div>
    </main>
);

export default Content