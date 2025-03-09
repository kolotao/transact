import { House, LucideIcon, ReceiptText, SendToBack, UsersRound } from "lucide-react"

export interface MenuItem {
    code: string
    icon: LucideIcon
    path: string
  }

export const mainMenu: MenuItem[] = [
  {
    code: 'dashboard',
    icon: House,
    path: 'dashboard',
  },
  {
    code: 'accounts',
    icon: ReceiptText,
    path: 'dashboard/accounts',
  },
  {
    code: 'transactions',
    icon: SendToBack,
    path: 'dashboard/transactions',
  },
  {
    code: 'Users',
    icon: UsersRound,
    path: 'dashboard/users',
  },
];