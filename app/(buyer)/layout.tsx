import Header from '../components/Header'

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="default" />
      {children}
    </>
  )
}
