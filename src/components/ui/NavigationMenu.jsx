"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconContext } from "../../context/IconContext";
import { useNavigate } from "react-router-dom";

/**
 * ==========   Utils   ============
 */

function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return {
    dimensions,
  };
}

/**
 * ==========   Styles   ============
 */

const container = {
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
  width: 200,
  height: "100vh",
  backgroundColor: "transparent",
  borderRadius: 0,
  overflow: "hidden",
  zIndex: 1000,
};

const nav = {
  width: 200,
  position: "relative",
  height: "100%",
};

const background = {
  backgroundColor: "rgba(17, 16, 17, 1)",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: 200,
};

const toggleContainer = {
  outline: "none",
  border: "none",
  userSelect: "none",
  cursor: "pointer",
  position: "absolute",
  top: 18,
  left: 15,
  width: 50,
  height: 50,
  borderRadius: "50%",
  background: "#45d4ff",
};

const list = {
  listStyle: "none",
  padding: 12,
  margin: 0,
  position: "absolute",
  top: 80,
  width: 160,
};

const listItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 0,
  margin: 0,
  listStyle: "none",
  marginBottom: 20,
  cursor: "pointer",
};

const iconPlaceholder = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  flex: "40px 0",
  marginRight: 12,
};

const textPlaceholder = {
  borderRadius: 5,
  width: 80,
  height: 20,
  flex: 1,
};

/**
 * ==========   Animation Variants   ============
 */

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

/**
 * ==========   Components   ============
 */

const colors = ["#ff00ff", "#ff00ff", "#ff00ff", "#ff00ff"];

const menuItems = [
  { label: "Home", iconKey: "home", href: "/" },
  { label: "Products", iconKey: "products", href: "/products" },
  { label: "Contact", iconKey: "messages", href: "/" },
  { label: "Settings", iconKey: "settings", href: "/" },
];

function MenuItem({ i, label, iconKey, href, isOpen, closeMenu, onExited }) {
  const icons = useContext(IconContext);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!isOpen) return;
    closeMenu();

    setTimeout(() => {
      navigate(href);
      if (onExited) onExited();
    }, 400);
  };

  return (
    <motion.li
      style={{
        ...listItem,
        cursor: isOpen ? "pointer" : "default",
      }}
      variants={itemVariants}
      whileHover={isOpen ? { scale: 1.1 } : {}}
      whileTap={isOpen ? { scale: 0.95 } : {}}
    >
      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          width: "100%",
          pointerEvents: isOpen ? "auto" : "none",
          background: "none",
          border: "none",
          cursor: isOpen ? "pointer" : "default",
        }}
        onClick={handleClick}
        tabIndex={isOpen ? 0 : -1}
        aria-disabled={!isOpen}
      >
        <div
          style={{
            ...iconPlaceholder,
            border: `2px solid #ff00ff`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#45d4ff",
            padding: "8px",
          }}
        >
          <FontAwesomeIcon icon={icons[iconKey]} />
        </div>
        <div
          style={{
            ...textPlaceholder,
            border: `2px solid #ff00ff`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            background: "transparent",
            color: "#45d4ff",
            padding: "16px",
          }}
        >
          {label}
        </div>
      </button>
    </motion.li>
  );
}

function Navigation({ isOpen, closeMenu }) {
  return (
    <motion.ul style={list} variants={navVariants}>
      {menuItems.map((item, i) => (
        <MenuItem
          i={i}
          key={i}
          label={item.label}
          iconKey={item.iconKey}
          href={item.href}
          isOpen={isOpen}
          closeMenu={closeMenu}
        />
      ))}
    </motion.ul>
  );
}

function Path(props) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );
}

function MenuToggle({ toggle }) {
  return (
    <button style={toggleContainer} onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
}

/**
 * ==========   Main Component   ============
 */

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const closeMenu = () => setIsOpen(false);
  return (
    <div style={container}>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        style={nav}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={background}
              variants={sidebarVariants}
              custom={height}
              initial="closed"
              animate="open"
              exit="closed"
            />
          )}
        </AnimatePresence>
        <Navigation isOpen={isOpen} closeMenu={closeMenu} />
        <MenuToggle toggle={() => setIsOpen((prev) => !prev)} />
      </motion.nav>
    </div>
  );
}
