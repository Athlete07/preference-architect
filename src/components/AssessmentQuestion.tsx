import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface AssessmentQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  onAnswer: (value: number) => void;
  selectedValue?: number;
}

const likertOptions = [
  { 
    value: 1, 
    label: "Very Inaccurate", 
    shortLabel: "Very Inaccurate",
    description: "This does not describe me at all"
  },
  { 
    value: 2, 
    label: "Inaccurate", 
    shortLabel: "Inaccurate",
    description: "This rarely describes me"
  },
  { 
    value: 3, 
    label: "Neutral", 
    shortLabel: "Neutral",
    description: "This sometimes describes me"
  },
  { 
    value: 4, 
    label: "Accurate", 
    shortLabel: "Accurate",
    description: "This often describes me"
  },
  { 
    value: 5, 
    label: "Very Accurate", 
    shortLabel: "Very Accurate",
    description: "This always describes me"
  },
];

export default function AssessmentQuestion({
  questionNumber,
  totalQuestions,
  question,
  onAnswer,
  selectedValue,
}: AssessmentQuestionProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Ultra-Compact Progress Section */}
      <div className="space-y-1 mb-3 flex-shrink-0">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="font-medium">Question {questionNumber} of {totalQuestions}</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-1.5 bg-muted" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-primary rounded-full shadow-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Ultra-Compact Question Card */}
      <Card className="flex-1 p-4 md:p-6 shadow-soft border-2 bg-gradient-card flex flex-col min-h-0">
        <div className="text-center space-y-3 flex-shrink-0">
          {/* Question Number Badge */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-primary text-primary-foreground font-bold text-lg shadow-lg mx-auto border-2 border-primary/20">
            {questionNumber}
          </div>
          
          {/* Question Text */}
          <h2 className="text-base md:text-lg lg:text-xl font-semibold leading-tight text-foreground px-1">
            {question}
          </h2>
          
          {/* Instructions */}
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            How true is this for you when studying or learning?
          </p>
        </div>

        {/* Ultra-Compact Likert Scale */}
        <div className="flex-1 flex items-center justify-center mt-2 min-h-0">
          <div className="grid grid-cols-5 gap-1 md:gap-2 w-full max-w-4xl">
            {likertOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={cn(
                  "group relative p-1.5 md:p-2 rounded-lg border-2 transition-all duration-300 transform",
                  "hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                  "active:scale-95 flex flex-col items-center justify-center min-h-[60px] md:min-h-[70px]",
                  selectedValue === option.value
                    ? "border-primary gradient-primary text-primary-foreground shadow-xl scale-105"
                    : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                )}
                aria-label={`${option.label} - ${option.value} out of 5`}
              >
                <div className="flex flex-col items-center space-y-1">
                  {/* Selection Indicator */}
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all duration-300"
                       style={{
                         borderColor: selectedValue === option.value ? 'currentColor' : 'transparent',
                         backgroundColor: selectedValue === option.value ? 'currentColor' : 'transparent'
                       }}>
                    {selectedValue === option.value ? (
                      <CheckCircle className="w-2 h-2" />
                    ) : (
                      <Circle className="w-2 h-2 opacity-50" />
                    )}
                  </div>
                  
                  {/* Value Number */}
                  <div className={cn(
                    "text-lg md:text-xl font-bold transition-colors",
                    selectedValue === option.value ? "text-primary-foreground" : "text-primary"
                  )}>
                    {option.value}
                  </div>
                  
                  {/* Label */}
                  <div className={cn(
                    "text-xs font-semibold text-center transition-colors leading-tight",
                    selectedValue === option.value ? "text-primary-foreground" : "text-muted-foreground"
                  )}>
                    {option.shortLabel}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
