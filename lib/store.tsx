import { createContext, useState, type ReactNode } from "react"
import { GoldRushProvider } from "@covalenthq/goldrush-kit"
import { useTheme } from "next-themes"

import { COVALENT_API_KEY } from "./utils"

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
  const { theme } = useTheme()
  const [txHash, setTxHash] = useState<string>("")
  const [chains, setChains] = useState<[]>([])
  const [tableState, setTableState] = useState({})
  const [color, setColor] = useState<any>(localStorage.getItem('color') ? localStorage.getItem('color') : "slate")
  const [borderRadius, setBorderRadius] = useState<any>(localStorage.getItem('border') ? localStorage.getItem('border') : "medium")

  const mode: any = theme

  return (
    <GoldRushProvider
      apikey={COVALENT_API_KEY ? COVALENT_API_KEY : ""}
      mode={mode}
      color={color}
      border_radius={borderRadius}
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
