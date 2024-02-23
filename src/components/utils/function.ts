/**
 * Function Search in an object's with attributes array
 * 
 * @param { string } word - Word to search for  
 * @param { Object } item - Object to search within
 * @param { string[] } attributes - attributes to search for the word
 * @returns {string[] | null} - array of matched values or null if no match
 * 
 * @author Nosfairal
 * 
 */
export const search = (word: string, item: any, attributes: string[]): string[] | null => {
    const match = attributes.some((attribute) => {
        if (
            item[attribute] &&
            item[attribute].toLowerCase().includes(word.toLowerCase())
        ) {
            return true;
        }
        return false;
    });

    if (match) {
        const result = attributes
            .map((attribute) => item[attribute] || "")
            .slice(0, 2);
        return result;
    }

    return null;
};