import Link from "next/link"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Index</Link>
          &nbsp;
          <Link href="/search">Search</Link>
          &nbsp;
          <Link href="/book/1">book/1</Link>
        </header>
        {children}
      </body>
    </html>
  )
}
