export type Modality = 'Visual' | 'Aural' | 'ReadWrite' | 'Kinesthetic';

export type ItemPolarity = '+' | '-';

export interface AssessmentItem {
  id: string;
  text: string;
  modality: Modality;
  polarity: ItemPolarity;
}

export interface Response {
  itemId: string;
  value: number;
}

export interface Scores {
  Visual: number;
  Aural: number;
  ReadWrite: number;
  Kinesthetic: number;
}

export interface AssessmentResults {
  scores: Scores;
  normalizedScores: Scores;
  primaryModality: Modality;
  secondaryModality: Modality | null;
  profileType: 'multimodal' | 'dual_preference' | 'single_dominant' | 'specialized';
  scoreRange: number;
  meanScore: number;
  confidenceLevel: number;
  responseConsistency: number;
  validationWarnings: string[];
}

export interface ValidationResult {
  isValid: boolean;
  issues: string[];
  consistencyScore: number;
  confidenceLevel: number;
}
