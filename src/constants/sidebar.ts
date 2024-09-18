import { TSidebarLinks } from '@/types/types'

export const sidebarLinks: TSidebarLinks = [
  {
    name: 'My Profile ',
    link: '/profile',
    image: '/images/my-profile.png',
  },
  {
    name: 'Address book',
    link: '/profile/addresses',
    image: '/images/address-book.png',
  },
  {
    name: 'My Appointments',
    link: '/profile/appointments',
    image: '/images/appointments.png',
  },
  {
    name: 'My Custom Blends',
    link: '/profile/my-blends',
    image: '/images/custom-blend.png',
  },
  {
    name: 'My Orders',
    link: '/profile/orders',
    image: '/images/orders.png',
  },
  {
    name: 'Payment Methods',
    link: '/profile/payments',
    image: '/images/payment.png',
  },
]
