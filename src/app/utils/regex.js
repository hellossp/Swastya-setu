/**
 * SwasthyaSetu Regular Expression Utilities
 */

export const REGEX_PATTERNS = {
  // matches standard float/integer values in report text
  numericValue: /[0-9]+(?:\.[0-9]+)?/g,
  
  // matches common diagnostic result flags
  qualitativeFlags: /positive|negative|reactive|non-reactive|equivocal/i,
  
  // gender identifiers
  femaleGender: /\b(gender|sex)\s*:\s*female\b|\b(gender|sex)\s*:\s*f\b|\bfemale\b/i,
  maleGender: /\b(gender|sex)\s*:\s*male\b|\b(gender|sex)\s*:\s*m\b|\bmale\b/i
};
