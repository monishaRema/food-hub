

export default function commonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <>
        {/* header */}
        {children}
        {/* footer */}
        </>
    );
}