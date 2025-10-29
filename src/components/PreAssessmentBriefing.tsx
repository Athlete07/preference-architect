import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Shield, Brain, CheckCircle, ArrowRight } from 'lucide-react';

interface PreAssessmentBriefingProps {
  onStart: () => void;
  onSkip: () => void;
}

export default function PreAssessmentBriefing({ onStart, onSkip }: PreAssessmentBriefingProps) {
  return (
    <div className="min-h-screen gradient-subtle py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            Pre-Assessment Briefing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Before You Begin
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This assessment will help you discover your learning preferences to optimize your study strategies. 
            Please read the following information for the most accurate results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-elegant">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Assessment Purpose</h3>
                <p className="text-muted-foreground">
                  Discover your current learning preferences to create personalized study strategies. 
                  This is about comfort zones, not abilities.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Duration</h3>
                <p className="text-muted-foreground">
                  Takes approximately 5-7 minutes. You can pause and resume anytime. 
                  Your progress is automatically saved.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Privacy & Data</h3>
                <p className="text-muted-foreground">
                  Your responses are stored locally on your device and never shared. 
                  No personal information is collected.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Accuracy Tips</h3>
                <p className="text-muted-foreground">
                  Answer honestly based on your actual learning experiences. 
                  Consider each question individually for best results.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 shadow-elegant bg-gradient-to-br from-primary/5 to-accent/5 border-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Important Reminders</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Preferences ≠ Abilities</h4>
                  <p className="text-muted-foreground">
                    These results show your comfort zones, not your learning capacity. 
                    Everyone can develop all learning modalities with practice.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Multi-Modal Learning</h4>
                  <p className="text-muted-foreground">
                    Research shows that using multiple learning modalities improves understanding 
                    and retention for everyone, regardless of preferences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Growth Mindset</h4>
                  <p className="text-muted-foreground">
                    Your learning preferences can develop and change over time. 
                    Use these results as a starting point for growth, not a fixed label.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-primary hover:opacity-90 shadow-lg px-8 py-6"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onSkip}
            className="px-8 py-6"
          >
            Skip Briefing
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            By starting the assessment, you agree to the terms and understand the purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
