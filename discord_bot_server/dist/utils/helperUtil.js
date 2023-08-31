"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionValue = void 0;
/**
 * This function returns the value of the option with the provided name
 * @param data any[]
 * @param optionName This is the name of the option to get the value for
 * @returns This is the value of the option
 */
function getOptionValue(data, optionName) {
    const option = data.find((option) => option.name === optionName);
    return option ? option.value : '';
}
exports.getOptionValue = getOptionValue;
//# sourceMappingURL=helperUtil.js.map