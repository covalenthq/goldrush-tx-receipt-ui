"use client"

import { useRouter } from "next/navigation"
import { Chain } from "@covalenthq/client-sdk"
import { TransactionReceiptView } from "@covalenthq/goldrush-kit"
import { Flex } from "@radix-ui/themes"

import { Button } from "@/components/ui/button"

export default function TX({
  params,
}: {
  params: { chain: Chain; tx_hash: string }
}) {
  const router = useRouter()

  return (
    <div className="w-full flex flex-col gap-4">
      <TransactionReceiptView
        chain_name={params.chain}
        tx_hash={params.tx_hash}
      />
      <Flex
        onClick={() => {
          router.back()
        }}
      >
        <Button>Back</Button>
      </Flex>
    </div>
  )
}
