import { Response, Scores, AssessmentResults, Modality, ValidationResult } from '@/types/assessment';
import { assessmentItems } from '@/data/assessmentItems';

export function validateResponses(responses: Response[]): ValidationResult {
  const issues: string[] = [];
  let consistencyScore = 1.0;
  
  if (responses.length === 0) {
    return { isValid: false, issues: ['No responses provided'], consistencyScore: 0, confidenceLevel: 0 };
  }

  // Check for straight-lining (all same response)
  const values = responses.map(r => r.value);
  const uniqueValues = new Set(values);
  if (uniqueValues.size <= 2) {
    issues.push("Your responses show very little variation. Please consider each question individually for more accurate results.");
    consistencyScore -= 0.3;
  }

  // Check for extreme responses (too many 1s or 5s)
  const extremeCount = values.filter(v => v === 1 || v === 5).length;
  const extremeRatio = extremeCount / responses.length;
  if (extremeRatio > 0.8) {
    issues.push("You used mostly extreme responses. Consider the middle options for more accurate results.");
    consistencyScore -= 0.2;
  }

  // Check for response patterns
  const consecutiveSame = checkConsecutiveResponses(values);
  if (consecutiveSame > 5) {
    issues.push("You have many consecutive identical responses. Please consider each question individually.");
    consistencyScore -= 0.2;
  }

  // Check response time consistency (if available)
  const responseVariation = calculateResponseVariation(values);
  if (responseVariation < 0.3) {
    issues.push("Your responses show very little variation across different question types.");
    consistencyScore -= 0.1;
  }

  const confidenceLevel = Math.max(0.3, consistencyScore);
  
  return {
    isValid: issues.length === 0,
    issues,
    consistencyScore,
    confidenceLevel
  };
}

function checkConsecutiveResponses(values: number[]): number {
  let maxConsecutive = 0;
  let currentConsecutive = 1;
  
  for (let i = 1; i < values.length; i++) {
    if (values[i] === values[i - 1]) {
      currentConsecutive++;
    } else {
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      currentConsecutive = 1;
    }
  }
  
  return Math.max(maxConsecutive, currentConsecutive);
}

function calculateResponseVariation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  return Math.min(1, standardDeviation / 2); // Normalize to 0-1
}

export function calculateScores(responses: Response[]): AssessmentResults {
  const validation = validateResponses(responses);
  
  const scores: Scores = {
    Visual: 0,
    Aural: 0,
    ReadWrite: 0,
    Kinesthetic: 0
  };

  // Calculate raw scores
  responses.forEach(response => {
    const item = assessmentItems.find(i => i.id === response.itemId);
    if (!item) return;

    const value = item.polarity === '+' ? response.value : (6 - response.value);
    scores[item.modality] += value;
  });

  // Calculate normalized scores (0-100 scale)
  const normalizedScores: Scores = {
    Visual: normalizeScore(scores.Visual),
    Aural: normalizeScore(scores.Aural),
    ReadWrite: normalizeScore(scores.ReadWrite),
    Kinesthetic: normalizeScore(scores.Kinesthetic)
  };

  // Find primary and secondary modalities based on normalized scores
  const sortedModalities = (Object.entries(normalizedScores) as [Modality, number][])
    .sort((a, b) => b[1] - a[1]);

  const primaryModality = sortedModalities[0][0];
  const primaryScore = sortedModalities[0][1];
  const secondaryScore = sortedModalities[1][1];
  const secondaryModality = (primaryScore - secondaryScore) <= 15 ? sortedModalities[1][0] : null;

  // Calculate statistics
  const scoresArray = Object.values(normalizedScores);
  const meanScore = scoresArray.reduce((a, b) => a + b, 0) / 4;
  const scoreRange = Math.max(...scoresArray) - Math.min(...scoresArray);

  // Determine profile type based on normalized scores
  let profileType: AssessmentResults['profileType'];
  
  if (scoreRange <= 20) {
    profileType = 'multimodal'; // All scores relatively balanced
  } else if (secondaryModality && (primaryScore - secondaryScore) <= 15) {
    profileType = 'dual_preference'; // Two clear preferences
  } else if (primaryScore >= 80) {
    profileType = 'specialized'; // Very high in one modality
  } else {
    profileType = 'single_dominant'; // One clear preference
  }

  return {
    scores,
    normalizedScores,
    primaryModality,
    secondaryModality,
    profileType,
    scoreRange,
    meanScore,
    confidenceLevel: validation.confidenceLevel,
    responseConsistency: validation.consistencyScore,
    validationWarnings: validation.issues
  };
}

function normalizeScore(rawScore: number): number {
  const maxPossible = 50; // 10 items × 5 points
  const minPossible = 10; // 10 items × 1 point
  const range = maxPossible - minPossible;
  return Math.round(((rawScore - minPossible) / range) * 100);
}

export function getModalityLevel(score: number): 'high' | 'moderate' | 'low' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'moderate';
  return 'low';
}

export function getModalityIcon(modality: Modality): string {
  const icons = {
    Visual: '📊',
    Aural: '🎧',
    ReadWrite: '📝',
    Kinesthetic: '🤲'
  };
  return icons[modality];
}

export function getModalityColor(modality: Modality): string {
  const colors = {
    Visual: 'from-blue-500 to-indigo-600',
    Aural: 'from-purple-500 to-pink-600',
    ReadWrite: 'from-green-500 to-emerald-600',
    Kinesthetic: 'from-orange-500 to-amber-600'
  };
  return colors[modality];
}

export function generatePersonalizedRecommendations(results: AssessmentResults): string[] {
  const recommendations: string[] = [];
  const { normalizedScores, profileType, scoreRange, primaryModality, secondaryModality } = results;
  
  // Profile-specific recommendations
  if (profileType === 'multimodal') {
    recommendations.push("Your balanced profile suggests you can adapt to different learning situations. Focus on optimizing each modality rather than relying on one.");
    recommendations.push("Use your flexibility to create multi-modal study sessions that combine different approaches for deeper understanding.");
  }
  
  if (profileType === 'specialized') {
    recommendations.push(`Your strong ${primaryModality} preference is an asset. Use it as your entry point, then deliberately add other modalities for deeper understanding.`);
    recommendations.push("Challenge yourself to spend 20% of your study time using your weaker modalities to build new learning pathways.");
  }
  
  if (profileType === 'dual_preference') {
    recommendations.push(`Your dual strength in ${primaryModality} and ${secondaryModality} allows you to approach material from multiple complementary angles.`);
    recommendations.push("Create study sessions that alternate between these two modalities to reinforce learning from different perspectives.");
  }
  
  // Score-specific recommendations
  const lowestModality = Object.entries(normalizedScores).sort((a, b) => a[1] - b[1])[0];
  if (lowestModality[1] < 40) {
    recommendations.push(`Consider developing your ${lowestModality[0]} learning skills. Start with 10-15 minutes per study session using this modality.`);
  }
  
  // Confidence-based recommendations
  if (results.confidenceLevel < 0.7) {
    recommendations.push("Your responses suggest some uncertainty. Consider retaking the assessment after reflecting on your learning preferences.");
  }
  
  return recommendations;
}

export function getConfidenceMessage(confidenceLevel: number): string {
  if (confidenceLevel >= 0.9) return "High confidence in results";
  if (confidenceLevel >= 0.7) return "Good confidence in results";
  if (confidenceLevel >= 0.5) return "Moderate confidence in results";
  return "Consider retaking for more accurate results";
}
