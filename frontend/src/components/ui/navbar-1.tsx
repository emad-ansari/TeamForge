import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Command } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-[#09090b]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-lg w-full max-w-3xl relative z-10">
        <div className="flex items-center">
          <motion.div
            className="mr-6 cursor-pointer flex items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-success shadow-glow group-hover:rotate-12 transition-transform duration-300">
                <Command className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight group-hover:text-glow transition-all duration-300 text-white whitespace-nowrap">TeamForge</span>
            </Link>
          </motion.div>
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Features", href: "#features" },
              { name: "Workflow", href: "#workflow" },
              { name: "Pricing", href: "#pricing" },
            ].map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <a href={item.href} className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300">
                  {item.name}
                </a>
              </motion.div>
            ))}
          </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center p-2 rounded-full hover:bg-white/5 transition-colors" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#09090b]/95 backdrop-blur-3xl z-50 pt-24 px-6 md:hidden border-b border-white/10"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-8 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {[
                { name: "Features", href: "#features" },
                { name: "Workflow", href: "#workflow" },
                { name: "Pricing", href: "#pricing" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a href={item.href} className="text-xl font-display font-bold text-muted-foreground hover:text-white transition-colors" onClick={toggleMenu}>
                    {item.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-8 mt-4 border-t border-white/10"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full px-5 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary/90 shadow-glow transition-colors"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
