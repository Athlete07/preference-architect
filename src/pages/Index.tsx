import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WelcomeScreen from '@/components/WelcomeScreen';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import ProgressBar from '@/components/ProgressBar';
import ResultsScreen from '@/components/ResultsScreen';
import { assessmentItems } from '@/data/assessmentItems';
import { Response, AssessmentResults } from '@/types/assessment';
import { calculateScores } from '@/utils/scoring';

type Screen = 'welcome' | 'assessment' | 'results';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleStart = () => {
    setScreen('assessment');
    setCurrentQuestion(0);
    setResponses([]);
  };

  const handleResponse = (itemId: string, value: number) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.itemId === itemId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { itemId, value };
        return updated;
      }
      return [...prev, { itemId, value }];
    });
  };

  const getCurrentResponse = () => {
    const current = assessmentItems[currentQuestion];
    return responses.find(r => r.itemId === current.id)?.value || null;
  };

  const handleNext = () => {
    if (currentQuestion < assessmentItems.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const calculatedResults = calculateScores(responses);
      setResults(calculatedResults);
      setScreen('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setScreen('welcome');
    setCurrentQuestion(0);
    setResponses([]);
    setResults(null);
  };

  const currentResponse = getCurrentResponse();
  const canProceed = currentResponse !== null;

  if (screen === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (screen === 'results' && results) {
    return <ResultsScreen results={results} onReset={handleReset} />;
  }

  const currentItem = assessmentItems[currentQuestion];

  return (
    <div className="min-h-screen gradient-subtle py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="sticky top-4 z-10">
          <div className="bg-card rounded-lg shadow-elegant p-6">
            <ProgressBar 
              current={currentQuestion + 1} 
              total={assessmentItems.length} 
            />
          </div>
        </div>

        <AssessmentQuestion
          item={currentItem}
          value={currentResponse}
          onChange={(value) => handleResponse(currentItem.id, value)}
          questionNumber={currentQuestion + 1}
          totalQuestions={assessmentItems.length}
        />

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="shadow-md transition-smooth"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="gradient-primary text-white shadow-md hover:shadow-lg transition-smooth"
          >
            {currentQuestion === assessmentItems.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {!canProceed && (
          <p className="text-center text-sm text-muted-foreground">
            Please select a response to continue
          </p>
        )}
      </div>
    </div>
  );
}
