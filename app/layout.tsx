import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import NotificationProvider from "./providers/NotificationProvider";
export const metadata = {
  title: "AIRBNB CLONE",
  description: "An AIRBNB Clone",
};
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NotificationProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
