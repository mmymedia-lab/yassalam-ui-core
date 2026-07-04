import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useUiSettings } from '../lib/UiSettingsContext.jsx';

/**
 * Public site footer. Reads settings from UiSettingsProvider.
 * Renders one of three styles based on `footer_style`: compact | minimal | standard.
 *
 * @param {object} props
 * @param {object} [props.anchorMap] - Same map as Header: component_id -> DOM anchor id.
 */
const Footer = ({ anchorMap = {} }) => {
  const {
    site_name, tagline, description, logo,
    contact_email, contact_phone, contact_address,
    facebook, instagram, twitter, youtube,
    sections, footer_style
  } = useUiSettings();

  const quickLinks = (sections || [])
    .filter(s => s.is_visible)
    .sort((a, b) => a.order_index - b.order_index)
    .map(s => ({
        name: s.label,
        href: `/#${anchorMap[s.component_id] || s.component_id}`
    }));

  const socialLinks = [
    { icon: Facebook, href: facebook, color: 'hover:bg-blue-600' },
    { icon: Instagram, href: instagram, color: 'hover:bg-pink-600' },
    { icon: Twitter, href: twitter, color: 'hover:bg-sky-500' },
    { icon: Youtube, href: youtube, color: 'hover:bg-red-600' }
  ].filter(s => s.href && s.href !== '#');

  const contactItems = [
    { icon: MapPin, value: contact_address, align: 'items-start', iconExtra: 'mt-0.5' },
    { icon: Phone, value: contact_phone, align: 'items-center', iconExtra: '' },
    { icon: Mail, value: contact_email, align: 'items-center', iconExtra: '' },
  ].filter(c => c.value);

  // RENDER: COMPACT (One Line)
  if (footer_style === 'compact') {
    return (
        <footer className="bg-slate-950 text-slate-400 py-6 border-t border-slate-900">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} {site_name}</p>
                <div className="flex gap-6">
                    {quickLinks.slice(0, 4).map(l => <a key={l.name} href={l.href} className="hover:text-white transition-colors">{l.name}</a>)}
                </div>
                <div className="flex gap-4">
                    {socialLinks.map((s, i) => <a key={i} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white"><s.icon size={16} /></a>)}
                </div>
            </div>
        </footer>
    );
  }

  // RENDER: MINIMAL (Centered)
  if (footer_style === 'minimal') {
    return (
        <footer className="bg-white text-gray-900 py-16 border-t border-gray-100">
            <div className="container mx-auto px-6 text-center space-y-8">
                {logo ? <img src={logo} alt={site_name} className="h-12 mx-auto" /> : <h3 className="text-2xl font-black">{site_name}</h3>}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold uppercase tracking-wider">
                    {quickLinks.map(l => <a key={l.name} href={l.href} className="hover:text-green-600 transition-colors">{l.name}</a>)}
                </div>
                <div className="flex justify-center gap-4">
                    {socialLinks.map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                            <s.icon size={18} />
                        </a>
                    ))}
                </div>
                <p className="text-gray-400 text-xs tracking-widest uppercase">&copy; {new Date().getFullYear()} {site_name}. Built for Ummah.</p>
            </div>
        </footer>
    );
  }

  // RENDER: STANDARD (Default 4 Columns)
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            {logo ? (
                <img
                src={logo}
                alt={site_name}
                className="h-16 w-auto object-contain bg-white/5 p-2 rounded-lg"
                />
            ) : (
                <h3 className="text-2xl font-bold text-white">{site_name}</h3>
            )}
            <p className="text-gray-300 leading-relaxed text-sm">
              {tagline}
              {description && <span className="opacity-70 mt-2 block text-xs line-clamp-3">{description}</span>}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xl font-bold mb-4 text-green-400">Link Cepat</p>
            <ul className="space-y-2 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                    <a href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 bg-green-800 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.name}
                    </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <p className="text-xl font-bold mb-4 text-green-400">Kontak</p>
            <ul className="space-y-3">
              {contactItems.map((c, i) => (
                <li key={i} className={`flex ${c.align} gap-2`}>
                  <c.icon className={`w-5 h-5 text-green-500 flex-shrink-0 ${c.iconExtra}`} />
                  <span className="text-gray-300 text-sm">{c.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <p className="text-xl font-bold mb-4 text-green-400">Media Sosial</p>
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className={`p-3 bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 ${s.color}`}>
                    <s.icon className="w-5 h-5" />
                  </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-slate-500 flex items-center justify-center gap-1 text-sm">
                &copy; {new Date().getFullYear()} {site_name}. Built with <Heart size={16} className="text-red-500 fill-red-500" /> for Ummah.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
