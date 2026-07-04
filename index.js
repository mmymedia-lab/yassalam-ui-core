// @yassalam/ui-core — barrel export

// Shell (public-facing)
export { default as Header } from './src/shell/Header.jsx';
export { default as Footer } from './src/shell/Footer.jsx';
export { default as PublicLayout } from './src/shell/PublicLayout.jsx';
export { default as ScrollToTop } from './src/shell/ScrollToTop.jsx';
export { default as ScrollToTopButton } from './src/shell/ScrollToTopButton.jsx';
export { Toaster } from './src/shell/toaster.jsx';
export { toast, useToast } from './src/shell/use-toast.jsx';
export {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from './src/shell/toast.jsx';

// Admin shell
export { default as AdminLayout } from './src/admin-shell/AdminLayout.jsx';
export { default as AdminLogin } from './src/admin-shell/AdminLogin.jsx';

// Section engine
export { default as SectionRenderer } from './src/section-engine/SectionRenderer.jsx';
export { SECTION_TYPES, createSectionRegistry } from './src/section-engine/SectionRegistry.js';

// Lib
export { createApiClient } from './src/lib/apiClient.js';
export { UiSettingsProvider, useUiSettings } from './src/lib/UiSettingsContext.jsx';
export { cn } from './src/lib/utils.js';
