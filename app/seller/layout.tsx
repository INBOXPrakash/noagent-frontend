import SellerHeader from '../components/SellerHeader'

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SellerHeader />
      <main>{children}</main>
    </>
  )
}
