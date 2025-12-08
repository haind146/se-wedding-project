import { WeddingPage } from '@/components/WeddingPage'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <WeddingPage searchParams={searchParams} side="bride" />
}
