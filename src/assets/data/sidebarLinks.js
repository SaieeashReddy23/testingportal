import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { BsReceiptCutoff } from 'react-icons/bs'
import { FaProductHunt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { BiHelpCircle } from 'react-icons/bi'
import { FiUser } from 'react-icons/fi'

import { RiAuctionLine } from 'react-icons/ri'

const sidebarLinks = [
  {
    id: 1,
    path: '/',
    text: 'Dashboard',
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    path: '/search',
    text: 'Member Search',
    icon: <FiUser />,
  },

  {
    id: 3,
    path: '/history',
    text: 'History',
    icon: <BsReceiptCutoff />,
  },

  {
    id: 4,
    path: '/comparison',
    text: 'Prod vs Stage',
    icon: <AiOutlineShoppingCart />,
  },
  {
    id: 5,
    path: '/settings',
    text: 'Settings',
    icon: <FiSettings />,
  },
]

export default sidebarLinks
