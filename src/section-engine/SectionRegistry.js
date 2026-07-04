/**
 * Known section_type keys used by the Yassalam layout_sections architecture.
 * All values are null on purpose — each consumer project maps its own
 * business components via createSectionRegistry().
 */
export const SECTION_TYPES = {
	system_hero: null,
	system_programs: null,
	system_kajian: null,
	system_about: null,
	system_articles: null,
	system_contact: null,
	system_crowdfunding: null,
	system_afiliasi: null,
	custom_text: null,
	custom_video: null,
	custom_video_slider: null,
};

/**
 * Build a registry mapping section_type -> React component.
 * Unknown extra keys are allowed so consumers can add new section types.
 *
 * @param {object} components - e.g. { system_hero: HeroCarousel, custom_text: GenericSection }
 * @returns {object} registry consumed by <SectionRenderer registry={...} />
 */
export const createSectionRegistry = (components = {}) => ({
	...SECTION_TYPES,
	...components,
});
