import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssessmentItem } from '@/types/assessment';

interface AssessmentQuestionProps {
  item: AssessmentItem;
  value: number | null;
  onChange: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const scaleLabels = [
  { value: 1, label: 'Very Inaccurate' },
  { value: 2, label: 'Inaccurate' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Accurate' },
  { value: 5, label: 'Very Accurate' }
];

export default function AssessmentQuestion({
  item,
  value,
  onChange,
  questionNumber,
  totalQuestions
}: AssessmentQuestionProps) {
  return (
    <Card className="p-8 shadow-elegant">
      <div className="space-y-6">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Question {questionNumber} of {totalQuestions}
          </div>
          <h3 className="text-lg font-medium leading-relaxed">
            {item.text}
          </h3>
        </div>

        <div className="text-sm text-muted-foreground italic">
          How true is this for you when studying or learning?
        </div>

        <RadioGroup
          value={value?.toString()}
          onValueChange={(val) => onChange(parseInt(val))}
          className="space-y-3"
        >
          {scaleLabels.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-smooth cursor-pointer hover:bg-muted/50 ${
                value === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
              onClick={() => onChange(option.value)}
            >
              <RadioGroupItem value={option.value.toString()} id={`${item.id}-${option.value}`} />
              <Label
                htmlFor={`${item.id}-${option.value}`}
                className="flex-1 cursor-pointer text-base"
              >
                <span className="font-medium">{option.value}.</span> {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
}
