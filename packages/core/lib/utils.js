export const isInteractiveElement = element => element.tabIndex !== -1;
export const isModifierUsed = event => event.ctrlKey || event.altKey || event.metaKey;
