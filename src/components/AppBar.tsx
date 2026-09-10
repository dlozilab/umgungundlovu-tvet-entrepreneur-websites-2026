import { useState } from "react"
import Button from "./Button"
import Drawer from "./Drawer"
import NavList from "./NavList"
import Icon from "./Icon"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
]

function AppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="app-bar">
        <a href="#" className="brand">
          <span className="brand-mark">SM</span>

          <span className="brand-name">
            SM Data & Tech
          </span>
        </a>

        <div className="desktop-nav">
          <NavList items={navItems} />
        </div>

        <div className="mobile-menu-button">
          <Button
            variant="solid"
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="menu" />
          </Button>
        </div>
      </header>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <NavList
          items={navItems}
          onNavigate={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  )
}

export default AppBar