import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { cookies } from "next/headers";

export const metadata = {
    title: "Website - Aerialink",
};

export default function WebsiteLayout({ children }) {
    return (
        <>
            <Header isAuth={cookies().has("authToken")} />
            <div className="home-page  max-w-7xl md:px-6 px-4 xl:px-0 m-auto xl:mt-35 lg:mt-32 mt-27">
                {children}
            </div>
            <Footer />
        </>
    );
}
