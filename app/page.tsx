"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChainItem, GoldRushClient } from "@covalenthq/client-sdk"
import { Flex } from "@radix-ui/themes"

import { TXContext } from "@/lib/store"
import { GOLDRUSH_API_KEY, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import ChainSelector from "@/components/chain/ChainSelector"

export default function IndexPage() {
  const { txHash } = useContext(TXContext)
  const [allChains, setAllChains] = useState<{
    foundational: ChainItem[]
    frontier: ChainItem[]
    community: ChainItem[]
  }>({
    foundational: [],
    frontier: [],
    community: [],
  })
  const [address, setAddress] = useState(
    txHash
      ? txHash
      : "0x7a038d2f5be4d196a3ff389497f8d61a639e4a32d353758b4f062cafbc5d475c"
  )
  const [busy, setBusy] = useState<boolean>(false)
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [chainName, setChainName] = useState<string>("Ethereum Mainnet")
  const [value, setValue] = useState("eth-mainnet")
  const { toast } = useToast()

  const handleAllChains = async () => {
    setBusy(true)
    if (!GOLDRUSH_API_KEY) return

    const client = new GoldRushClient(GOLDRUSH_API_KEY)
    try {
      const allChainsResp = await client.BaseService.getAllChains()
      if (allChainsResp.error) {
        toast({
          title: "Something went wrong.",
          description: allChainsResp.error_message,
        })
      }
      if (allChainsResp.data && allChainsResp.data.items) {
        const foundational: ChainItem[] = []
        const frontier: ChainItem[] = []
        const community: ChainItem[] = []

        allChainsResp.data.items.forEach((chain: ChainItem) => {
          if (chain.name && chain.priority_label === "Foundational") {
            foundational.push(chain)
          } else if (chain.name && chain.priority_label === "Frontier") {
            frontier.push(chain)
          } else {
            community.push(chain)
          }
        })

        setAllChains({
          foundational,
          frontier,
          community,
        })
      }
    } catch (exception) {
      console.log(exception)
    }
    setBusy(false)
  }

  useEffect(() => {
    handleAllChains()
  }, [])

  return (
    <section className="container flex flex-col justify-center gap-6 md:py-10 h-[calc(100vh-150px)] items-center ">
      <Flex direction="column" gap="4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          GoldRush Transaction Receipt UI
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            router.push(`/tx/${value}/${address}`)
          }}
        >
          <Flex direction="column" gap="3">
            <ChainSelector
              open={open}
              value={value}
              chainName={chainName}
              busy={busy}
              allChains={allChains}
              setValue={setValue}
              setOpen={setOpen}
              setChainName={setChainName}
            />
            <Label htmlFor="contract_address">Transaction Hash</Label>
            <Input
              className=""
              type="input"
              id="address"
              placeholder="Contract Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />
            <div>
              <Button
                disabled={address.length === 0 || !value || busy}
                type="submit"
              >
                Continue
              </Button>
            </div>
          </Flex>
        </form>
      </Flex>
    </section>
  )
}
