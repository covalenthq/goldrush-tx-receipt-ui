"use client"

import { useRouter } from "next/navigation"
import { Chain } from "@covalenthq/client-sdk"
import { TransactionReceipt } from "@covalenthq/goldrush-kit"
import { Flex } from "@radix-ui/themes"

import { Button } from "@/components/ui/button"

export default function TX({
  params,
}: {
  params: { chain: Chain; tx_hash: string }
}) {
  const router = useRouter()

  return (
    <div className="w-full flex items-center flex-col gap-4 pb-20">
      <div className="w-full relative md:w-[50rem] md:flex-row">
        <TransactionReceipt
          chain_name={params.chain}
          tx_hash={params.tx_hash}
        />
      </div>

      <Flex
        className="w-full"
        onClick={() => {
          router.back()
        }}
      >
        <Button>Back</Button>
      </Flex>
    </div>
  )
}
