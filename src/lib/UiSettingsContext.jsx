import { createContext, useContext } from 'react';

/**
 * Decouples ui-core components from any project-specific settings context.
 * The consumer project feeds its own settings object (site_name, logo,
 * sections, header_style, footer_style, socials, contacts, ...) into
 * UiSettingsProvider — typically sourced from its own SiteContext.
 */
const UiSettingsContext = createContext({});

export const UiSettingsProvider = ({ value = {}, children }) => (
	<UiSettingsContext.Provider value={value}>{children}</UiSettingsContext.Provider>
);

export const useUiSettings = () => useContext(UiSettingsContext);
