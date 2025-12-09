import React from "react";
import { useState } from "react";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";

export default function UserLayout({ children, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && (
        <HamburgerMenu
          closeMenu={() => setMenuOpen(false)}
          handleLogout={handleLogout}
        />
      )}

      <div className="pt-24 px-6">
        {children}
      </div>
    </>
  );
}
