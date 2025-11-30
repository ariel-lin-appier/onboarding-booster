import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface ScorecardProps {
  score: number;
}

export function Scorecard({ score }: ScorecardProps) {
  const getStatus = () => {
    if (score >= 90) return { 
      label: 'Ready', 
      textColor: 'text-green-600',
      iconColor: 'text-green-600',
      labelColor: 'text-green-700',
      circleColor: 'text-green-600',
      Icon: CheckCircle2 
    };
    if (score >= 70) return { 
      label: 'Needs Work', 
      textColor: 'text-yellow-600',
      iconColor: 'text-yellow-600',
      labelColor: 'text-yellow-700',
      circleColor: 'text-yellow-600',
      Icon: AlertTriangle 
    };
    return { 
      label: 'Critical Issues', 
      textColor: 'text-red-600',
      iconColor: 'text-red-600',
      labelColor: 'text-red-700',
      circleColor: 'text-red-600',
      Icon: XCircle 
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-slate-700 mb-4">Event Data Readiness</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <div className={`${status.textColor} mb-1`}>
            {score}%
          </div>
          <div className="flex items-center gap-2">
            <status.Icon className={`size-4 ${status.iconColor}`} />
            <span className={`text-sm ${status.labelColor}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative size-24">
          <svg className="transform -rotate-90 size-24">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-200"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
              className={`${status.circleColor} transition-all duration-1000`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-slate-900 text-sm">
            {score}%
          </div>
        </div>
      </div>
    </div>
  );
}