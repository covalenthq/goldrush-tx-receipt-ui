import { createContext, useState, type ReactNode } from "react"
import kit from "@/goldrush.config"
import { GoldRushProvider } from "@covalenthq/goldrush-kit"
import { useTheme } from "next-themes"

import { GOLDRUSH_API_KEY } from "./utils"

interface TXContextType {
  txHash: string
  setTxHash: Function
  chains: any
  setChains: Function
  tableState: { [key: string]: boolean }
  setTableState: Function
  color: string
  setColor: Function
  setBorderRadius: Function
  borderRadius: string
}

export const TXContext = createContext<TXContextType>({} as TXContextType)

interface TXProviderProps {
  children: ReactNode
}

export const TXProvider: React.FC<TXProviderProps> = ({ children }) => {
  const [txHash, setTxHash] = useState<string>("")
  const [chains, setChains] = useState<[]>([])
  const [tableState, setTableState] = useState({})
  const [color, setColor] = useState<any>(
    localStorage.getItem("color") ? localStorage.getItem("color") : "slate"
  )
  const [borderRadius, setBorderRadius] = useState<any>(
    localStorage.getItem("border") ? localStorage.getItem("border") : "medium"
  )

  return (
    <GoldRushProvider
      apikey={GOLDRUSH_API_KEY ? GOLDRUSH_API_KEY : ""}
      theme={
        localStorage.getItem("goldrush_theme")
          ? JSON.parse(localStorage.getItem("goldrush_theme")!)
          : kit.theme
      }
    >
      <TXContext.Provider
        value={{
          txHash,
          setTxHash,
          chains,
          setChains,
          tableState,
          setTableState,
          setColor,
          color,
          setBorderRadius,
          borderRadius,
        }}
      >
        {children}
      </TXContext.Provider>
    </GoldRushProvider>
  )
}
