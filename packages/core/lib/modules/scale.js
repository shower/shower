export default (shower) => {
    const { container } = shower;
    const getScale = () => {
        const maxRatio = Math.max(
            container.offsetWidth / window.innerWidth,
            container.offsetHeight / window.innerHeight,
        );

        return `scale(${1 / maxRatio})`;
    };

    const updateStyle = () => {
        container.style.transform = shower.isFullMode ? getScale() : '';
    };

    shower.addEventListener('modechange', updateStyle);
    window.addEventListener('resize', updateStyle);
    window.addEventListener('load', updateStyle);
};
