import "./globals.css";

export const metadata = {
  title: "Eatwithmytj - Premium Milkshakes",
  description: "Order fresh milkshakes, smoothies, parfait in Kajola",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}