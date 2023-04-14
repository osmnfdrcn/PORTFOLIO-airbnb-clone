import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/ui/navbar";
import RegisterModal from "./components/ui/modals/AuthModals/RegisterModal";
import NotificationProvider from "./providers/NotificationProvider";
import LoginModal from "./components/ui/modals/AuthModals/LoginModal";
import { getCurrentUser } from "./utils/getCurrentUser";
import AirbnbYourHomeModal from "./components/ui/modals/AirbnbYourHomeModal";
export const metadata = {
  title: "AIRBNB CLONE",
  description: "An AIRBNB Clone",
};
const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <NotificationProvider />
        <LoginModal />
        <RegisterModal />
        <AirbnbYourHomeModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-[200px]">{children}</div>
      </body>
    </html>
  );
}
