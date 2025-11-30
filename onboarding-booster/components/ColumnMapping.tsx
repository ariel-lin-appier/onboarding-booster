import { ColumnMapping as ColumnMappingType } from '../App';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ColumnMappingProps {
  mappings: ColumnMappingType[];
  onMappingChange?: (sourceColumn: string, newStandardField: string) => void;
}

// Standard schema fields available for mapping
const STANDARD_FIELDS = [
  'order_id',
  'event_name',
  'customer_id',
  'event_timestamp',
  'item_id',
  'order_value',
  'order_status',
  'payment_method',
  'transaction_id',
  'user_email',
  'product_name',
  'quantity',
  'currency',
  'discount_amount',
];

export function ColumnMapping({ mappings, onMappingChange }: ColumnMappingProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mapped':
        return <CheckCircle2 className="size-4 text-green-600" />;
      case 'missing':
        return <AlertTriangle className="size-4 text-orange-600" />;
      case 'extra':
        return <XCircle className="size-4 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mapped':
        return 'bg-green-50 border-green-200';
      case 'missing':
        return 'bg-orange-50 border-orange-200';
      case 'extra':
        return 'bg-slate-50 border-slate-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-slate-700">1. Map Data - AI Schema Detection</h3>
        <p className="text-sm text-slate-500 mt-1">
          Automatically detected column mappings to standard schema
        </p>
      </div>

      <div className="p-4 space-y-2">
        {mappings.map((mapping, index) => (
          <div
            key={index}
            className={`rounded-lg border ${getStatusColor(mapping.status)}`}
          >
            <div className="flex items-center gap-3 p-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="flex-shrink-0">{getStatusIcon(mapping.status)}</div>
                
                {mapping.status === 'mapped' && (
                  <>
                    <div className="px-3 py-1 bg-white rounded border border-slate-200 text-sm font-mono">
                      {mapping.sourceColumn}
                    </div>
                    <ArrowRight className="size-4 text-slate-400 flex-shrink-0" />
                    
                    {onMappingChange ? (
                      <Select 
                        value={mapping.standardField} 
                        onValueChange={(value) => onMappingChange(mapping.sourceColumn, value)}
                      >
                        <SelectTrigger className="w-[180px] h-8 bg-blue-50 border-blue-200 font-mono text-sm text-blue-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STANDARD_FIELDS.map(field => (
                            <SelectItem key={field} value={field} className="font-mono text-sm">
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="px-3 py-1 bg-blue-50 rounded border border-blue-200 text-sm font-mono text-blue-700">
                        {mapping.standardField}
                      </div>
                    )}
                    
                    <div className="ml-auto text-xs text-slate-500">
                      {mapping.confidence}% confidence
                    </div>
                  </>
                )}

                {mapping.status === 'missing' && (
                  <>
                    <div className="text-sm">
                      <span className="font-mono text-blue-700">{mapping.standardField}</span>
                      <span className="text-slate-500 ml-2">- Missing in source data</span>
                    </div>
                  </>
                )}

                {mapping.status === 'extra' && (
                  <>
                    <div className="text-sm">
                      <span className="font-mono">{mapping.sourceColumn}</span>
                      <span className="text-slate-500 ml-2">- Extra column not in standard schema</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Semantic Description Row */}
            {mapping.semanticDescription && (
              <div className="px-3 pb-3 pt-0">
                <div className="flex gap-2 text-xs">
                  <div className="flex-1">
                    <span className="text-slate-500">Semantic: </span>
                    <span className="text-slate-600">{mapping.semanticDescription}</span>
                  </div>
                  {mapping.exampleValue && (
                    <div className="text-slate-500">
                      Example: <span className="font-mono text-slate-700">{mapping.exampleValue}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <div className="flex gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="size-3 text-green-600" />
            <span>{mappings.filter(m => m.status === 'mapped').length} Mapped</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="size-3 text-orange-600" />
            <span>{mappings.filter(m => m.status === 'missing').length} Missing</span>
          </div>
          <div className="flex items-center gap-1">
            <XCircle className="size-3 text-slate-400" />
            <span>{mappings.filter(m => m.status === 'extra').length} Extra</span>
          </div>
        </div>
      </div>
    </div>
  );
}