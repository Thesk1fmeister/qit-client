import { TIconName } from '@/components/icons'
import React from 'react'

export type Status = 'completed' | 'paid' | 'processing' | 'failed' | 'cancelled'

export type TLoginForm = {
  email: string
  password: string
  remember?: boolean
}

export type TResetPassword = {
  email: string
}
export type TRegisterForm = TLoginForm & {
  first_name: string
  last_name: string
  phone: string
}
export type TCreateLocationForm = TLoginForm & {
  locationName: string
  address: string
  state: string
  zipCode: string
  city: string
}

export type TDialogTabs = {
  id: number | string
  value: string
  icon?: TIconName
}
export type TSidebarLinks = {
  name: string
  link: string
  image: string
}[]

export type TNavigationLinks = {
  name: string
  link: string
}[]

export type TLocation = {
  id: string
  email: string
  username: string
  unhashed_password: string
  password: string
  store_address: {
    address: string
    city: string
    full_address: string
    region: string
    state: string
    zip_code: string
  }
}

export type TOption = {
  label: string
  value: string | number
  type?: string
}

export type TCustomer = {
  id: string
  first_name: string
  last_name: string
  phone: string
  email: string
  birthdate: string | null
  company_name: string
  date_joined: string
  is_shipping_address_equals_billing: boolean
  billing_address: {
    region: string
    state: string
    city: string
    address: string
    zip_code: string
    full_address: string
    apartment: string
  }
  shipping_address: {
    region: string
    state: string
    city: string
    address: string
    zip_code: string
    full_address: string
    apartment: string
  } | null
}

export type TProfileDetails = {
  avatar?: string
  email: string
  first_name: string
  full_name: string
  id: string
  last_name: string
  phone: string
  password?: string
  username: string
  birthdate: string
}

export type TPasswordChange = {
  old_password: string
  new_password: string
  password: string
}

export type TUserProfile = {
  id: string
  full_name: string
  email: string
}

export type TUserState = {
  profile: TProfileDetails | null
  role: string | null
}

export type TProfileResponse = TProfileDetails & {
  username: string
  role: string
}

export type TTabs = {
  value: string
  type: string
  content: React.ReactNode
}

export type TNote = {
  text: string
  customer: string
}
export type TNoteDetails = {
  id: string
  text: string
  created_at: string
  updated_at: string
}

export type TService = {
  id: number
  service_name: string
  capacity: number
}

export type TReturnedService = {
  id: number
  title: string
  hours: number
}

export type TSchedule = {
  id: number
  day_of_week: string
  is_workday: boolean
  start_time: string
  end_time: string
}

export type TEmployeeDetails = {
  id: string
  first_name: string
  last_name: string
  location: string
  services: TService[]
  schedules: { [key: string]: TSchedule }
}
