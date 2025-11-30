import { AlertTriangle, XCircle, Info, CheckCircle2 } from 'lucide-react';
import { DataIssue } from '../App';
import { Button } from './ui/button';

interface IssuesListProps {
  issues: DataIssue[];
  onIssueSelect: (issueId: string) => void;
}

export function IssuesList({ issues, onIssueSelect }: IssuesListProps) {
  const getIcon = (severity: string, fixed: boolean) => {
    if (fixed) return CheckCircle2;
    if (severity === 'error') return XCircle;
    if (severity === 'warning') return AlertTriangle;
    return Info;
  };

  const getColors = (severity: string, fixed: boolean) => {
    if (fixed) return { icon: 'text-green-600', text: 'text-green-900' };
    if (severity === 'error') return { icon: 'text-red-600', text: 'text-red-900' };
    if (severity === 'warning') return { icon: 'text-yellow-600', text: 'text-yellow-900' };
    return { icon: 'text-blue-600', text: 'text-blue-900' };
  };

  return (
    <div className="space-y-2">
      {issues.map((issue) => {
        const Icon = getIcon(issue.severity, issue.fixed);
        const colors = getColors(issue.severity, issue.fixed);

        return (
          <Button
            key={issue.id}
            variant="outline"
            className={`w-full justify-start text-left h-auto p-4 ${
              issue.fixed ? 'opacity-50' : 'hover:bg-slate-50'
            }`}
            onClick={() => !issue.fixed && onIssueSelect(issue.id)}
            disabled={issue.fixed}
          >
            <div className="flex items-start gap-3 w-full">
              <Icon className={`size-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <div className={`${colors.text} mb-1`}>
                  {issue.title}
                </div>
                <div className="text-sm text-slate-600">
                  {issue.description}
                </div>
                {issue.fixed && (
                  <div className="text-sm text-green-600 mt-1">
                    ✓ Fixed
                  </div>
                )}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}