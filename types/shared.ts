import { Chain, ChainItem } from "@covalenthq/client-sdk"

export interface GRKKitType {
  theme: {
    borderRadius: number
    colors: {
      dark: {
        primary: string
        background: string
        foreground: string
        secondary: string
      }
      light: {
        primary: string
        background: string
        foreground: string
        secondary: string
      }
    }
    mode: string
  }
  brand: {
    title: string
    subtitle: string
    logo_url: string
    github: string
  }
  chains?: Chain[]
}

export interface ChainSelectorProps {
  open: boolean
  value: string
  chainName: string
  busy: boolean
  allChains: {
    foundational: ChainItem[]
    frontier: ChainItem[]
    community: ChainItem[]
  }
  setValue: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setChainName: React.Dispatch<React.SetStateAction<string>>
}
