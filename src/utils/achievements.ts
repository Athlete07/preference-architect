import { AssessmentResults } from '@/types/assessment';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: 'profile' | 'completion' | 'engagement' | 'growth';
}

export function checkAchievements(results: AssessmentResults, retakeCount: number = 0): Achievement[] {
  const achievements: Achievement[] = [];
  const { normalizedScores, profileType, scoreRange, confidenceLevel } = results;

  // Profile-based achievements
  if (profileType === 'multimodal') {
    achievements.push({
      id: 'balanced_learner',
      name: 'Balanced Learner',
      description: 'Scores within 20 points across all modalities',
      icon: '⚖️',
      unlocked: true,
      category: 'profile'
    });
  }

  if (profileType === 'specialized') {
    const maxScore = Math.max(...Object.values(normalizedScores));
    if (maxScore >= 80) {
      achievements.push({
        id: 'specialist',
        name: 'Specialist',
        description: 'One modality 20+ points higher than others',
        icon: '🎯',
        unlocked: true,
        category: 'profile'
      });
    }
  }

  if (profileType === 'dual_preference') {
    achievements.push({
      id: 'dual_strength',
      name: 'Dual Strength',
      description: 'Two clear learning preferences identified',
      icon: '🤝',
      unlocked: true,
      category: 'profile'
    });
  }

  // Score-based achievements
  const allScores = Object.values(normalizedScores);
  const highScores = allScores.filter(score => score >= 70).length;
  
  if (highScores >= 3) {
    achievements.push({
      id: 'multimodal_master',
      name: 'Multimodal Master',
      description: 'Three or more modalities above 70%',
      icon: '🌟',
      unlocked: true,
      category: 'profile'
    });
  }

  if (allScores.every(score => score >= 50)) {
    achievements.push({
      id: 'well_rounded',
      name: 'Well-Rounded',
      description: 'All modalities above 50%',
      icon: '🎨',
      unlocked: true,
      category: 'profile'
    });
  }

  // Engagement achievements
  if (retakeCount >= 1) {
    achievements.push({
      id: 'growth_minded',
      name: 'Growth Minded',
      description: 'Completed assessment multiple times',
      icon: '🔄',
      unlocked: true,
      category: 'engagement'
    });
  }

  if (confidenceLevel >= 0.9) {
    achievements.push({
      id: 'confident_responder',
      name: 'Confident Responder',
      description: 'High confidence in responses',
      icon: '💪',
      unlocked: true,
      category: 'engagement'
    });
  }

  // Completion achievements
  achievements.push({
    id: 'first_completion',
    name: 'First Steps',
    description: 'Completed your first learning preferences assessment',
    icon: '🎉',
    unlocked: true,
    category: 'completion'
  });

  return achievements;
}

export function getAchievementProgress(results: AssessmentResults, retakeCount: number): {
  total: number;
  unlocked: number;
  percentage: number;
} {
  const achievements = checkAchievements(results, retakeCount);
  const unlocked = achievements.filter(a => a.unlocked).length;
  
  return {
    total: achievements.length,
    unlocked,
    percentage: Math.round((unlocked / achievements.length) * 100)
  };
}
