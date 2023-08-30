/**
 * This function returns the value of the option with the provided name
 * @param data any[]
 * @param optionName This is the name of the option to get the value for
 * @returns This is the value of the option
 */
export function getOptionValue(data: any[], optionName: string): string {
    const option = data.find((option) => option.name === optionName);
    return option ? option.value : '';
}
