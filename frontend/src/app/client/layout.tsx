import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}