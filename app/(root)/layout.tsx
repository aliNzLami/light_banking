import CorePanel from "@/components/CorePanel/CorePanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <CorePanel />
        <div className="custom_container">
          { children }
        </div>
    </main>
  );
}
