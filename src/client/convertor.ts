export function convertForRequest(data: Record<string, any>): Record<string, any> {
    const output: Record<string, any> = {};
    for (const property in data) {
        if (Array.isArray(data[property])) {
            output[property] = data[property].join(',')
        } else {
            output[property] = data[property]
        }
    }
    return output;
}
