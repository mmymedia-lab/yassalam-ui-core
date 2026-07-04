import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useUiSettings } from '../lib/UiSettingsContext.jsx';

/**
 * Public site header with dynamic navbar built from `sections`.
 *
 * @param {object} props
 * @param {object} [props.anchorMap] - Maps section component_id to DOM anchor id,
 *   e.g. { hero: 'beranda', about: 'tentang' }. Defaults to using component_id as-is.
 */
const Header = ({ anchorMap = {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logo, site_name, sections, header_style } = useUiSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate Menu Items dynamically
  const navItems = (sections || [])
    .filter(s => s.in_navbar)
    .sort((a, b) => (a.order_index_nav || 0) - (b.order_index_nav || 0))
    .map(s => ({
        name: s.label,
        id: s.id,
        href: `/#${anchorMap[s.component_id] || s.component_id}`
    }));

  const homeAnchor = anchorMap['hero'] || 'beranda';

  const handleNavClick = (e, href) => {
    if (!href.includes('#')) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
        window.location.href = href;
        return;
    }
    const targetId = href.split('#')[1];
    if (targetId === homeAnchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  // Styles logic
  const isFloating = header_style === 'floating';
  const isModern = header_style === 'modern';

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isFloating ? (isScrolled ? 'top-4 px-4' : 'top-0') : 'top-0'
      }`}
    >
      <nav
        className={`container mx-auto transition-all duration-500 ${
            isFloating
                ? (isScrolled ? 'max-w-5xl rounded-3xl shadow-2xl border border-white/10' : 'max-w-full')
                : 'max-w-full'
        } ${isScrolled ? 'py-2' : 'py-4'}`}
        style={{
            background: isScrolled ? 'var(--navbar-bg)' : (isFloating ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.95)'),
            backdropFilter: 'var(--navbar-backdrop)',
            WebkitBackdropFilter: 'var(--navbar-backdrop)'
        }}
      >
        <div className={`flex items-center px-6 ${isModern ? 'flex-col md:flex-row justify-between gap-4' : 'justify-between'}`}>

          {/* Logo (Left or Center) */}
          <motion.a
            href={`#${homeAnchor}`}
            onClick={(e) => handleNavClick(e, `#${homeAnchor}`)}
            className={`flex items-center gap-2 ${isModern ? 'md:order-2 mx-auto md:mx-0' : 'order-1'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {logo ? (
                <img
                src={logo}
                alt={site_name}
                className={`transition-all duration-300 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
                />
            ) : (
                <span className="text-2xl font-black text-green-800 tracking-tighter">{site_name}</span>
            )}
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            className={`hidden md:flex items-center gap-8 ${isModern ? 'order-1' : 'order-2'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-700 hover:text-green-800 font-bold text-sm uppercase tracking-wider transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-800 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </motion.div>

          {/* Action Button / Mobile Trigger (Right) */}
          <div className={`${isModern ? 'order-3' : 'order-3'} flex items-center gap-4`}>
             <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 hover:text-green-800 transition-colors p-2"
                aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              >
                {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="px-6 py-8 space-y-4 text-center">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-xl font-black text-gray-800 hover:text-green-800 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
