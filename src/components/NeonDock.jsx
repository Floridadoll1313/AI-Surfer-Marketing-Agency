import React from 'react'
import { NavLink } from 'react-router-dom'
import './neon-dock.css'

export default function NeonDock() {
  return (
    <div className="neon-dock">
      <NavLink to="/" className="dock-item">
        Home
      </NavLink>

      <NavLink to="/pricing" className="dock-item">
        Pricing
      </NavLink>

      <NavLink to="/services" className="dock-item">
        Services
      </NavLink>

      <NavLink to="/contact" className="dock-item">
        Contact
      </NavLink>
    </div>
  )
}
