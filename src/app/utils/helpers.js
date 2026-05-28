/**
 * SwasthyaSetu General Helper Utilities
 */

/**
 * Delay execution for a number of milliseconds
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if object is empty
 * @param {Object} obj 
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

/**
 * Group an array of items by a specific key
 * @param {Array} array 
 * @param {string} key 
 * @returns {Object}
 */
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};
