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
      // Escape alias for regex safety
      const escapedAlias = alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // Match alias NOT followed by any letter or digit, followed by AT MOST 30 non-newline, non-digit characters, and then the value.
      // This prevents matching across unrelated text blocks or lines.
      const regex = new RegExp(
        `(?:^|\\b|\\s)(${escapedAlias})(?![a-zA-Z0-9])[^\\r\\n0-9]{0,30}(positive|negative|reactive|non-reactive|normal|equivocal|scanty|\\d+\\+\\s*to\\s*\\d+|\\d+(?:\\.\\d+)?)\\b`,
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

        // Mask the matched portion of the clean report text with spaces so it won't be matched by subsequent tests
        const matchIndex = match.index;
        const matchLength = match[0].length;
        cleanReportText = cleanReportText.slice(0, matchIndex) + " ".repeat(matchLength) + cleanReportText.slice(matchIndex + matchLength);

        break; // Stop checking other aliases for this test
      }
    }
  }

  return results;
}
