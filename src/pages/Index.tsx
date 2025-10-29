import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import WelcomeScreen from '@/components/WelcomeScreen';
import PreAssessmentBriefing from '@/components/PreAssessmentBriefing';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import ResultsScreen from '@/components/ResultsScreen';
import { assessmentItems } from '@/data/assessmentItems';
import { Response, AssessmentResults } from '@/types/assessment';
import { calculateScores } from '@/utils/scoring';

type Screen = 'welcome' | 'briefing' | 'assessment' | 'results';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Load saved progress with error handling
    try {
      const saved = localStorage.getItem("assessment_progress");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.responses && Array.isArray(data.responses) && 
            typeof data.currentQuestion === 'number' && 
            data.currentQuestion >= 0 && 
            data.currentQuestion < assessmentItems.length) {
          setResponses(data.responses);
          setCurrentQuestion(data.currentQuestion);
        }
      }
    } catch (error) {
      console.error("Failed to load saved progress:", error);
      // Clear corrupted data
      localStorage.removeItem("assessment_progress");
    }
  }, []);

  useEffect(() => {
    // Save progress with error handling
    if (screen === 'assessment') {
      try {
        localStorage.setItem(
          "assessment_progress",
          JSON.stringify({ responses, currentQuestion })
        );
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  }, [responses, currentQuestion, screen]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (screen !== 'assessment' || isPaused) return;
      
      if (e.key >= "1" && e.key <= "5") {
        handleAnswer(parseInt(e.key));
      } else if (e.key === "ArrowLeft" && currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else if (e.key === "ArrowRight" && getCurrentResponse()) {
        handleNext();
      } else if (e.key === "Escape") {
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestion, responses, isPaused, screen]);

  const handleStart = () => {
    setScreen('briefing');
  };

  const handleStartAssessment = () => {
    setScreen('assessment');
    setCurrentQuestion(0);
    setResponses([]);
  };

  const handleSkipBriefing = () => {
    setScreen('assessment');
    setCurrentQuestion(0);
    setResponses([]);
  };

  const handleAnswer = (value: number) => {
    const currentItem = assessmentItems[currentQuestion];
    if (!currentItem) return;
    
    // Update responses and handle auto-advance
    setResponses(prev => {
      const existing = prev.findIndex(r => r.itemId === currentItem.id);
      let newResponses;
      if (existing >= 0) {
        newResponses = [...prev];
        newResponses[existing] = { itemId: currentItem.id, value };
      } else {
        newResponses = [...prev, { itemId: currentItem.id, value }];
      }

      // Auto-advance after a brief delay
      setTimeout(() => {
        if (currentQuestion < assessmentItems.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Use the updated responses for completion
          handleComplete(newResponses);
        }
      }, 300);

      return newResponses;
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
      // Validate that we have responses for all questions
      const answeredQuestions = new Set(responses.map(r => r.itemId));
      const allQuestions = new Set(assessmentItems.map(item => item.id));
      const missingQuestions = [...allQuestions].filter(id => !answeredQuestions.has(id));
      
      if (missingQuestions.length === 0) {
        handleComplete(responses);
      } else {
        console.warn("Missing responses for questions:", missingQuestions);
        alert("Please answer all questions before proceeding.");
      }
    }
  };

  const handleComplete = (finalResponses?: Response[]) => {
    try {
      const responsesToUse = finalResponses || responses;
      const calculatedResults = calculateScores(responsesToUse);
      setResults(calculatedResults);
      setScreen('results');
      localStorage.removeItem("assessment_progress");
    } catch (error) {
      console.error("Failed to complete assessment:", error);
      // Show error to user
      alert("There was an error processing your results. Please try again.");
      setScreen('welcome');
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

  if (screen === 'briefing') {
    return <PreAssessmentBriefing onStart={handleStartAssessment} onSkip={handleSkipBriefing} />;
  }

  if (screen === 'results' && results) {
    return <ResultsScreen results={results} onReset={handleReset} />;
  }

  const currentItem = assessmentItems[currentQuestion];

  // Safety check for currentItem
  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Assessment Error</h2>
          <p className="text-muted-foreground mb-4">Unable to load assessment question.</p>
          <Button onClick={() => setScreen('welcome')} className="gradient-primary">
            Return to Start
          </Button>
        </div>
      </div>
    );
  }

  if (isPaused) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-md animate-in fade-in duration-500">
          <div className="relative">
            <div className="text-8xl animate-bounce">⏸️</div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">!</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Assessment Paused
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Take a moment to breathe. Your progress is automatically saved and you can continue anytime.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Progress: {currentQuestion + 1} of {assessmentItems.length} questions</span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-full gradient-primary transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / assessmentItems.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => setIsPaused(false)}
              size="lg"
              className="w-full gradient-primary hover:opacity-90 shadow-lg"
            >
              Continue Assessment
            </Button>
            <Button
              onClick={() => setScreen('welcome')}
              variant="outline"
              size="lg"
              className="w-full hover:bg-primary/10"
            >
              Save & Exit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-subtle overflow-hidden flex flex-col">
      {/* Compact Header */}
      <header className="border-b bg-card/80 backdrop-blur-md shadow-sm flex-shrink-0">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">📚</span>
            </div>
            <h1 className="text-base md:text-lg font-bold gradient-primary bg-clip-text text-transparent">
              Learning Preferences Assessment
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              <span>In Progress</span>
            </div>
            <Button
              onClick={() => setIsPaused(true)}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-primary/10 h-8 px-3"
            >
              <Pause className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Pause</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Takes remaining height */}
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <AssessmentQuestion
            questionNumber={currentQuestion + 1}
            totalQuestions={assessmentItems.length}
            question={currentItem.text}
            onAnswer={handleAnswer}
            selectedValue={currentResponse}
          />

          {/* Compact Navigation */}
          <div className="flex-shrink-0 mt-2">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              {/* Previous Button */}
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentQuestion === 0}
                className="gap-2 w-full sm:w-auto order-2 sm:order-1 hover:bg-primary/10 transition-colors h-10"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {/* Question Counter */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground order-1 sm:order-2">
                <div className="flex gap-1">
                  {Array.from({ length: assessmentItems.length }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i < currentQuestion
                          ? 'bg-primary'
                          : i === currentQuestion
                          ? 'bg-primary/50'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-xs">
                  {currentQuestion + 1} of {assessmentItems.length}
                </span>
              </div>

              {/* Next/Complete Button */}
              {currentQuestion === assessmentItems.length - 1 &&
              responses.length === assessmentItems.length ? (
                <Button
                  onClick={() => handleComplete(responses)}
                  size="lg"
                  className="gap-2 w-full sm:w-auto order-3 gradient-primary hover:opacity-90 shadow-lg h-10"
                >
                  View Results
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="outline"
                  disabled={!currentResponse}
                  className="gap-2 w-full sm:w-auto order-3 hover:bg-primary/10 transition-colors h-10"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
