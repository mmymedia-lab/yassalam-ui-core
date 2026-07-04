import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useUiSettings } from '../lib/UiSettingsContext.jsx';

/**
 * Public layout wrapper: SEO meta + analytics scripts + Header + Footer.
 * Page content renders into the router <Outlet />.
 *
 * @param {object} props
 * @param {object} [props.anchorMap] - Forwarded to Header and Footer.
 */
const PublicLayout = ({ anchorMap = {} }) => {
  const {
    site_name, tagline, seo_description, seo_keywords,
    google_analytics_id, meta_pixel_id, icon
  } = useUiSettings();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        {/* SEO Meta Tags */}
        <title>{site_name} {tagline ? `- ${tagline}` : ''}</title>
        {seo_description && <meta name="description" content={seo_description} />}
        {seo_keywords && <meta name="keywords" content={seo_keywords} />}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={site_name} />
        {seo_description && <meta property="og:description" content={seo_description} />}
        {icon && <meta property="og:image" content={icon} />}

        {/* Google Analytics */}
        {google_analytics_id && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${google_analytics_id}`}></script>
        )}
        {google_analytics_id && (
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${google_analytics_id}');
            `}
          </script>
        )}

        {/* Meta Pixel */}
        {meta_pixel_id && (
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${meta_pixel_id}');
              fbq('track', 'PageView');
            `}
          </script>
        )}
      </Helmet>

      {/* Navbar on all public pages */}
      <Header anchorMap={anchorMap} />

      {/* Page content (filled by each route) */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer on all public pages */}
      <Footer anchorMap={anchorMap} />
    </div>
  );
};

export default PublicLayout;
