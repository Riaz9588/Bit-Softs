export type UserPayloadObject = {
  admin?: {
    name?: string
    email?: string
    avatar?: string
  }
  error?: {
    email?: string 
    password?: string
  },
  loading?: boolean
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id: number
  avatar: string
  login: string
  name: string
  company: string
  city: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  name: string
  email: string
}

// my interfaces
export type UserData= {
  id?: number 
  surname: string
  forename: string
  email: string
  phone: string
  social_security_number?: string
  address?: string
  post_code?: string
  village?: string
  sex?: string
  birth_date?: string,
  nationality?: string
  id_num?: string
  siret_num?: string,
  profile_pic?: any,
  complete?: boolean
}

