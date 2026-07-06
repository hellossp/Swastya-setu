/**
 * SwasthyaSetu Medical Parameter Matcher
 */

export function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/[ \t]+/g, " ") // Preserves newlines (\r, \n) while collapsing consecutive spaces and tabs
    .replace(/[|]/g, " ")
    .trim();
}

export function extractParameters(text, testsDatabase) {
  const results = [];
  const matchedTestIds = new Set();
  let cleanReportText = cleanText(text);

  for (const test of testsDatabase) {
    if (matchedTestIds.has(test.id)) continue;

    for (const alias of test.aliases) {
      const escapedAlias = alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Match the alias.
      const aliasRegex = new RegExp(`(?:^|\\b|\\s)(${escapedAlias})(?![a-zA-Z0-9])`, "i");
      
      const match = cleanReportText.match(aliasRegex);
      if (match) {
        // Extract a window of up to 120 characters immediately following the alias
        const startIndex = match.index + match[0].length;
        const windowText = cleanReportText.slice(startIndex, startIndex + 120);

        // Strip common reference range formats from this window to avoid capturing them as the result
        let strippedWindow = windowText;
        const rangeRegexes = [
          /\b\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?\b/g, // e.g., 70 - 110 or 70.00-110.00
          /<\s*\d+(?:\.\d+)?\b/g, // e.g., < 140
          />\s*\d+(?:\.\d+)?\b/g, // e.g., > 140
          /up\s*to\s*\d+(?:\.\d+)?/gi, // e.g., up to 140
          /upto\s*\d+(?:\.\d+)?/gi, // e.g., upto 140
          /\(\s*\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?\s*\)/g, // e.g., (70 - 110)
        ];

        rangeRegexes.forEach(r => {
          strippedWindow = strippedWindow.replace(r, " ");
        });

        // Now find the FIRST valid result value in this stripped window
        const valueRegex = /(?:positive|negative|reactive|non-reactive|normal|equivocal|scanty|\d+\+\s*to\s*\d+|\d+(?:\.\d+)?)/i;
        const valueMatch = strippedWindow.match(valueRegex);

        if (valueMatch) {
          let valueStr = valueMatch[0].trim().toLowerCase();
          let value = parseFloat(valueStr);
          let textValue = null;

          if (isNaN(value)) {
            textValue = valueStr;
            value = null; 
          }

          results.push({
            testId: test.id,
            matchedAlias: match[1],
            value,
            textValue,
            rawMatch: valueMatch[0],
          });

          matchedTestIds.add(test.id);

          // Mask the alias and the specific matched value in the main text so they aren't reused
          const escapeValue = valueMatch[0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const maskRegex = new RegExp(`(${escapedAlias}|${escapeValue})`, "gi");
          cleanReportText = cleanReportText.replace(maskRegex, " ");
          
          break; // Stop checking other aliases for this test
        }
      }
    }
  }

  return results;
}
