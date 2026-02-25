import Header from '@/app/components/Header'

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header  />
      {children}
    </>
  )
}
