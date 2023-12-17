function camelCaseToTitleCase(camelCase: string) {
    const words = camelCase.split(/(?=[A-Z])/);
    
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export { camelCaseToTitleCase };