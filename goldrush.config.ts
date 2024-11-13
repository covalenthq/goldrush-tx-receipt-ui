import { type GRKKitType } from "@/types/shared";

export const GRKKit: GRKKitType = {
  brand: {
    title: "GoldRush",
    subtitle: "Transaction Receipt UI",
    logo_url: "/goldrush-logo.png",
    github: "https://github.com/covalenthq/goldrush-tx-receipt-ui"
  },
  theme: {
    borderRadius: 6,
    colors: {
      dark: {
        primary: "#FF4C8B",
        background: "#000426",
        foreground: "#FFFFFF",
        secondary: "#868E96",
      },
      light: {
        primary: "#FF4C8B",
        background: "#FFFFFF",
        foreground: "#1C2024",
        secondary: "#868E96",
      },
    },
    mode: "dark",
  }
};

export default GRKKit;