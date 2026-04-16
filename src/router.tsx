import { createBrowserRouter } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'

// Members Area
import Members from './pages/members/Members'
import Tools from './pages/members/Tools'
import Dashboard from './pages/members/Dashboard'   // private founder cockpit

// Lore & Worldbuilding
import Lore from './pages/Lore'
import Blueprints from './pages/Blueprints'
import Progression from './pages/Progression'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/members',
    element: <Members />
  },
  {
    path: '/members/tools',
    element: <Tools />
  },
  {
    path: '/members/dashboard',
    element: <Dashboard />
  },
  {
    path: '/lore',
    element: <Lore />
  },
  {
    path: '/blueprints',
    element: <Blueprints />
  },
  {
    path: '/progression',
    element: <Progression />
  }
])
