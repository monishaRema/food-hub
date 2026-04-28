import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";


export default function commonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <>
       <Navbar></Navbar>
        {children}
       <Footer></Footer>
        </>
    );
}