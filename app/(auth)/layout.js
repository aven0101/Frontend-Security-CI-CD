export const metadata = {
    title: "Dashboard - Aerialink",
};

export default function AuthLayout({ children }) {
    return (
        <div className="authScreens">
            <div className="max-w-7xl md:px-6 px-4 xl:px-0 m-auto">
                {children}
            </div>
        </div>
    );
}
