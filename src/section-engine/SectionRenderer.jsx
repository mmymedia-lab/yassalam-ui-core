/**
 * Renders homepage sections driven by the layout_sections table.
 *
 * Resolution order per section:
 *   1. registry[section.section_type]
 *   2. legacyMap[section.component_id]  (backward compat for old rows without section_type)
 *   3. renderFallback(section) if provided, otherwise skip.
 *
 * Each resolved component receives the full row as the `section` prop.
 *
 * @param {object} props
 * @param {Array}    props.sections - Rows from layout_sections (expects is_visible, order_index, section_type, component_id, id).
 * @param {object}   props.registry - section_type -> component map (see createSectionRegistry).
 * @param {object}   [props.legacyMap] - component_id -> component map for legacy rows.
 * @param {function} [props.renderFallback] - (section) => ReactNode for unresolved types.
 */
const SectionRenderer = ({ sections = [], registry = {}, legacyMap = {}, renderFallback }) => {
	const activeSections = sections
		.filter(s => s.is_visible)
		.sort((a, b) => a.order_index - b.order_index);

	return (
		<>
			{activeSections.map((section) => {
				const Component = registry[section.section_type] || legacyMap[section.component_id];

				if (!Component) {
					return renderFallback ? renderFallback(section) : null;
				}

				return <Component key={section.id} section={section} />;
			})}
		</>
	);
};

export default SectionRenderer;
