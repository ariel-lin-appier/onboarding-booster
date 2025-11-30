import { DQBRule } from '../App';
import { Sparkles, CheckCircle2, Wand2 } from 'lucide-react';
import { Button } from './ui/button';

interface DQBRulesProps {
  rules: DQBRule[];
}

export function DQBRules({ rules }: DQBRulesProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'standardize':
        return <Wand2 className="size-4" />;
      case 'clean':
        return <Sparkles className="size-4" />;
      case 'enrich':
        return <CheckCircle2 className="size-4" />;
      default:
        return <Sparkles className="size-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'standardize':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'clean':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'enrich':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-slate-700">3. Clean & Standardize - DQB Rules</h3>
        <p className="text-sm text-slate-500 mt-1">
          AI-suggested data quality improvement rules
        </p>
      </div>

      <div className="p-4 space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className={`px-2 py-1 rounded border text-xs flex items-center gap-1 ${getCategoryColor(rule.category)}`}>
                {getCategoryIcon(rule.category)}
                <span className="capitalize">{rule.category}</span>
              </div>
              
              {rule.applied && (
                <div className="ml-auto flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 className="size-3" />
                  Applied
                </div>
              )}
            </div>

            <div className="mt-3">
              <h4 className="text-slate-900 mb-1">{rule.title}</h4>
              <p className="text-sm text-slate-600">{rule.description}</p>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="text-xs text-slate-500">Column:</div>
              <code className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                {rule.column}
              </code>
            </div>

            <div className="mt-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Example:</div>
              <code className="text-sm text-slate-700">{rule.example}</code>
            </div>

            {!rule.applied && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="default" className="flex-1">
                  Apply Rule
                </Button>
                <Button size="sm" variant="outline">
                  Customize
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <div className="flex gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <Wand2 className="size-3 text-blue-600" />
            <span>{rules.filter(r => r.category === 'standardize').length} Standardize</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="size-3 text-purple-600" />
            <span>{rules.filter(r => r.category === 'clean').length} Clean</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="size-3 text-green-600" />
            <span>{rules.filter(r => r.category === 'enrich').length} Enrich</span>
          </div>
        </div>
      </div>
    </div>
  );
}
