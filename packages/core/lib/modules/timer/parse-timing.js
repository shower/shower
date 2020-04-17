const units = ['s', 'm', 'h'];
const hasUnits = (timing) => {
    return units.some((unit) => timing.includes(unit));
};

const parseUnits = (timing) => {
    return units.map((unit) => timing.match(`(\\S+)${unit}`)).map((match) => match && match[1]);
};

const parseColons = (timing) => {
    return `::${timing}`.split(':').reverse();
};

const SEC_IN_MIN = 60;
const SEC_IN_HOUR = SEC_IN_MIN * 60;

export default (timing) => {
    if (!timing) return 0;

    const parsed = hasUnits(timing) ? parseUnits(timing) : parseColons(timing);

    let [sec, min, hour] = parsed.map(Number);

    sec += min * SEC_IN_MIN;
    sec += hour * SEC_IN_HOUR;

    return Math.max(sec * 1000, 0);
};
