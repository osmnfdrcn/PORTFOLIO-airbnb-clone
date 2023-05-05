import "./globals.css";
import { Montserrat, Nunito } from "next/font/google";
import NotificationProvider from "./providers/NotificationProvider";
import getCurrentUser from "./helpers/getCurrentUser";
import {
  LoginModal,
  RegisterModal,
  SearchModal,
  AirbnbYourHomeModal,
  Navbar,
} from "@/app/components/ui";

export const metadata = {
  title: "AIRBNB CLONE",
  description: "An AIRBNB Clone",
};
const font = Nunito({
  weight: "400",
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
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-[200px]">{children}</div>
      </body>
    </html>
  );
}
