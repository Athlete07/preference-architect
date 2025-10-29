import { AssessmentResults } from '@/types/assessment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getModalityIcon, getModalityColor, getModalityLevel } from '@/utils/scoring';
import { AlertCircle, ArrowRight, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResultsScreenProps {
  results: AssessmentResults;
  onReset: () => void;
}

export default function ResultsScreen({ results, onReset }: ResultsScreenProps) {
  const { scores, primaryModality, secondaryModality, profileType } = results;

  const profileTitles = {
    multimodal: '🌈 Balanced Multi-Modal Learner',
    dual_preference: '🎯 Dual-Preference Profile',
    single_dominant: '⭐ Single-Preference Profile',
    specialized: '🔍 Specialized Preference Profile'
  };

  const profileDescriptions = {
    multimodal: 'You have relatively balanced preferences across all modalities. This flexibility is a significant advantage—you can adapt to different learning situations effectively.',
    dual_preference: `You show strong preferences for both ${primaryModality} and ${secondaryModality} learning. This dual strength allows you to approach material from multiple complementary angles.`,
    single_dominant: `You have a clear preference for ${primaryModality} learning, with moderate engagement in other modalities. This gives you a comfortable starting point while maintaining flexibility.`,
    specialized: `You have a very strong ${primaryModality} preference. While this indicates a clear strength, developing other modalities will significantly enhance your learning effectiveness.`
  };

  return (
    <div className="min-h-screen gradient-subtle py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            Your Results
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            {profileTitles[profileType]}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {profileDescriptions[profileType]}
          </p>
        </div>

        <Card className="p-6 border-2 border-accent/20 bg-accent/5">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold">Remember: Preferences ≠ Abilities</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These scores reflect your <strong>comfort and preference</strong>, not your learning capacity. 
                Research shows that <strong>all learners benefit from multi-modal strategies</strong>, regardless 
                of preference. Use these results as a starting point, then deliberately practice with all modalities 
                to maximize your learning effectiveness.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {(Object.entries(scores) as [keyof typeof scores, number][]).map(([modality, score]) => {
            const level = getModalityLevel(score);
            const percentage = (score / 50) * 100;
            const icon = getModalityIcon(modality);
            const isPrimary = modality === primaryModality;
            const isSecondary = modality === secondaryModality;

            return (
              <Card key={modality} className={`p-6 shadow-elegant transition-smooth hover:shadow-lg ${isPrimary ? 'ring-2 ring-primary' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{modality}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {level} preference
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{score}</div>
                      <div className="text-sm text-muted-foreground">/ 50</div>
                    </div>
                  </div>

                  <Progress value={percentage} className="h-2" />

                  {isPrimary && (
                    <Badge className="gradient-primary text-white">
                      Primary Preference
                    </Badge>
                  )}
                  {isSecondary && (
                    <Badge variant="secondary">
                      Secondary Preference
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed insights for each modality */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Understanding Your Preferences</h2>
          
          {(Object.entries(scores) as [keyof typeof scores, number][])
            .sort((a, b) => b[1] - a[1])
            .map(([modality, score]) => {
              const level = getModalityLevel(score);
              const icon = getModalityIcon(modality);

              return (
                <Card key={modality} className="p-8 shadow-elegant">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{modality} Preference</h3>
                        <p className="text-muted-foreground">Score: {score}/50 ({level})</p>
                      </div>
                    </div>

                    {level === 'high' && (
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          <strong>What this means:</strong> You have a strong natural affinity for {modality.toLowerCase()} learning. 
                          This is your comfort zone where information processing feels most intuitive.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                          <strong className="text-foreground">Your strength, with a caveat:</strong> While this preference 
                          is valuable, avoid over-reliance. Research shows that even high-preference learners benefit from 
                          multi-modal engagement. Use this as your entry point, then expand to other modalities for deeper understanding.
                        </p>
                      </div>
                    )}

                    {level === 'moderate' && (
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          <strong>What this means:</strong> You have a balanced relationship with {modality.toLowerCase()} learning. 
                          You can use it effectively but don't depend on it exclusively.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                          <strong className="text-foreground">Your flexibility advantage:</strong> This moderate score indicates 
                          adaptability—you can work with or without this modality as the situation demands.
                        </p>
                      </div>
                    )}

                    {level === 'low' && (
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          <strong>What this means:</strong> {modality} formats don't feel naturally intuitive to you. 
                          You may find them uncomfortable or less helpful than other approaches.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                          <strong className="text-foreground">Your growth opportunity:</strong> This is NOT a weakness—
                          it's a development area. Deliberately practicing {modality.toLowerCase()} learning will build 
                          new cognitive pathways and unlock understanding that other modalities might miss. The discomfort 
                          signals growth.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
        </div>

        {/* Multi-Modal Strategy Card */}
        <Card className="p-8 shadow-elegant bg-gradient-to-br from-primary/5 to-accent/5 border-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Your Multi-Modal Learning Strategy</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Start With Your Strength</h4>
                  <p className="text-muted-foreground">
                    Begin learning new material using {primaryModality} approaches—this builds confidence and 
                    initial understanding in your comfort zone.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Add Complementary Modalities</h4>
                  <p className="text-muted-foreground">
                    Once you have basic understanding, deliberately engage other modalities. If you started with 
                    diagrams, explain them verbally. If you read notes, create a visual summary. This creates 
                    multiple memory pathways.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Practice Your Growth Areas</h4>
                  <p className="text-muted-foreground">
                    Deliberately use your lower-scoring modalities. The discomfort means you're building new 
                    skills. Start small—if you're low in visual, draw one simple diagram per study session. 
                    Gradually increase as it becomes less awkward.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Test Multi-Modally</h4>
                  <p className="text-muted-foreground">
                    When reviewing, test yourself using ALL modalities: Can you draw it? Explain it aloud? 
                    Write a summary? Apply it practically? If you can't do all four, you don't fully understand it yet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Evidence-Based Strategies */}
        <Card className="p-8 shadow-elegant">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Evidence-Based Strategies for All Learners</h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Regardless of your preference profile, these scientifically-validated techniques improve learning 
              for everyone:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">🔄 Retrieval Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Test yourself frequently without looking at notes. This is more effective than re-reading, 
                  regardless of modality preference.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">📅 Spaced Repetition</h4>
                <p className="text-sm text-muted-foreground">
                  Review material at increasing intervals (1 day, 3 days, 1 week, 1 month). Spacing beats cramming 
                  for all learning styles.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">🔀 Interleaving</h4>
                <p className="text-sm text-muted-foreground">
                  Mix different topics and modalities in study sessions rather than blocking by type. This improves 
                  long-term retention.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">🎯 Elaboration</h4>
                <p className="text-sm text-muted-foreground">
                  Connect new information to what you already know. Ask "why" and "how" questions. Explain concepts 
                  in your own words across modalities.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">💡 Concrete Examples</h4>
                <p className="text-sm text-muted-foreground">
                  Abstract concepts stick better when paired with specific examples. Create examples using multiple 
                  modalities (draw it, explain it, write it, apply it).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">🔗 Dual Coding</h4>
                <p className="text-sm text-muted-foreground">
                  Combine words and images whenever possible. This creates two memory traces instead of one, 
                  doubling retrieval pathways.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 shadow-elegant bg-gradient-to-r from-primary to-accent text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Your Next Steps</h2>
            </div>

            <div className="space-y-3 text-white/90">
              <div className="flex gap-3">
                <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">This week:</strong> Try one study session using your primary modality, 
                  then add one other modality to the same material. Notice what each adds to your understanding.
                </p>
              </div>
              <div className="flex gap-3">
                <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">This month:</strong> Deliberately practice your lowest-scoring modality. 
                  Set a goal like "create one visual diagram per week" or "explain concepts aloud 3x per week."
                </p>
              </div>
              <div className="flex gap-3">
                <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Long-term:</strong> When you truly understand something, you should be 
                  able to express it in all four modalities. Make that your standard for mastery.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center pt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={onReset}
            className="shadow-md hover:shadow-lg transition-smooth"
          >
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
}
