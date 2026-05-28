/**
 * SwasthyaSetu Medical Parameter Matcher
 */

export function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ")
    .replace(/[|]/g, " ")
    .trim();
}

export function extractParameters(text, testsDatabase) {
  const results = [];
  const matchedTestIds = new Set();
  const cleanReportText = cleanText(text);

  for (const test of testsDatabase) {
    if (matchedTestIds.has(test.id)) continue;

    for (const alias of test.aliases) {
      // Escape alias for regex safety
      const escapedAlias = alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // Match alias followed by any non-digit symbols/letters (like parenthesized units or dots) and then the value
      const regex = new RegExp(
        `(?:^|\\b|\\s)(${escapedAlias})[^0-9]*(positive|negative|reactive|non-reactive|normal|equivocal|scanty|\\d+\\+\\s*to\\s*\\d+|\\d+(?:\\.\\d+)?)\\b`,
        "i"
      );

      const match = cleanReportText.match(regex);
      if (match) {
        let valueStr = match[2].trim().toLowerCase();
        let value = parseFloat(valueStr);
        let textValue = null;

        // If parseFloat is NaN, it's a qualitative value (e.g. "positive")
        if (isNaN(value)) {
          textValue = valueStr;
          value = null; // No numeric value
        }

        results.push({
          testId: test.id,
          matchedAlias: match[1],
          value,
          textValue,
          rawMatch: match[0],
        });

        // Prevent duplicate parameter detection by marking this test ID as matched
        matchedTestIds.add(test.id);
        break; // Stop checking other aliases for this test
      }
    }
  }

  return results;
}
