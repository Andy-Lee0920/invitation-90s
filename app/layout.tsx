import type { Metadata } from "next";
import "./globals.css";

const title = "졸수연 초대장";
const detail_title = "정효숙님의 졸수연에 초대드립니다.";

export const metadata: Metadata = {
  title: title,
  description: detail_title,
  icons: {
    icon: "/myfavicon.ico",
  },
  openGraph: {
    title: title,
    description: detail_title,
    images: "/image/basic/firstImage.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
