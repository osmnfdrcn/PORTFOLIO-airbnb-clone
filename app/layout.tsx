import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import NotificationProvider from "./providers/NotificationProvider";
import LoginModal from "./components/Modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import AirbnbYourHomeModal from "./components/Modals/AirbnbYourHomeModal";
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
        {children}
      </body>
    </html>
  );
}
