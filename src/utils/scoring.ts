import { Response, Scores, AssessmentResults, Modality } from '@/types/assessment';
import { assessmentItems } from '@/data/assessmentItems';

export function calculateScores(responses: Response[]): AssessmentResults {
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

  // Find primary and secondary modalities
  const sortedModalities = (Object.entries(scores) as [Modality, number][])
    .sort((a, b) => b[1] - a[1]);

  const primaryModality = sortedModalities[0][0];
  const primaryScore = sortedModalities[0][1];
  const secondaryScore = sortedModalities[1][1];
  const secondaryModality = (primaryScore - secondaryScore) <= 5 ? sortedModalities[1][0] : null;

  // Calculate statistics
  const scoresArray = Object.values(scores);
  const meanScore = scoresArray.reduce((a, b) => a + b, 0) / 4;
  const scoreRange = Math.max(...scoresArray) - Math.min(...scoresArray);

  // Determine profile type
  let profileType: AssessmentResults['profileType'];
  
  if (scoreRange <= 8) {
    profileType = 'multimodal'; // All scores relatively balanced
  } else if (secondaryModality && (primaryScore - secondaryScore) <= 5) {
    profileType = 'dual_preference'; // Two clear preferences
  } else if (primaryScore >= 42) {
    profileType = 'specialized'; // Very high in one modality
  } else {
    profileType = 'single_dominant'; // One clear preference
  }

  return {
    scores,
    primaryModality,
    secondaryModality,
    profileType,
    scoreRange,
    meanScore
  };
}

export function getModalityLevel(score: number): 'high' | 'moderate' | 'low' {
  if (score >= 38) return 'high';
  if (score >= 23) return 'moderate';
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
