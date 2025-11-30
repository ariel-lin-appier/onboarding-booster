import { Database, FileText, CheckCircle2, AlertCircle, Globe, Building2 } from 'lucide-react';
import { DataRow, DataIssue, Step, ProjectContext, ExtractedInfo, ColumnMapping, ColumnStats, DQBRule } from '../App';
import { Scorecard } from './Scorecard';
import { DataTable } from './DataTable';
import { ColumnMapping as ColumnMappingComponent } from './ColumnMapping';
import { DataQualityStats } from './DataQualityStats';
import { DQBRules } from './DQBRules';

interface DataWorkspaceProps {
  step: Step;
  dataRows: DataRow[];
  issues: DataIssue[];
  readinessScore: number;
  projectContext: ProjectContext;
  extractedInfo: ExtractedInfo | null;
  columnMappings: ColumnMapping[];
  columnStats: ColumnStats[];
  dqbRules: DQBRule[];
  onMappingChange?: (sourceColumn: string, newStandardField: string) => void;
}

export function DataWorkspace({
  step,
  dataRows,
  issues,
  readinessScore,
  projectContext,
  extractedInfo,
  columnMappings,
  columnStats,
  dqbRules,
  onMappingChange,
}: DataWorkspaceProps) {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Database className="size-6 text-slate-600" />
          <h2 className="text-slate-900">Data Workspace</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Initial State - Website */}
        {step === 'website' && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="size-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-600 mb-2">Ready to analyze your business</h3>
              <p className="text-slate-400">
                Enter your website to get started
              </p>
            </div>
          </div>
        )}

        {/* Review State - Show Extracted Info */}
        {step === 'review' && extractedInfo && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="size-5 text-blue-600" />
                <h3 className="text-slate-900">Extracted Company Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Brand Name</div>
                  <div className="text-slate-900">{extractedInfo.brandName}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Industry</div>
                  <div className="text-slate-900">{extractedInfo.industry}</div>
                </div>
                <div className="col-span-2 p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Description</div>
                  <div className="text-slate-900">{extractedInfo.description}</div>
                </div>
                <div className="col-span-2 p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Region</div>
                  <div className="text-slate-900">{extractedInfo.region}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Model State */}
        {step === 'business-model' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-slate-900 mb-4">Business Model Configuration</h3>
              <p className="text-slate-600 text-sm mb-4">
                Select your selling models and organization structure. This helps us prepare the right data schemas for your business.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">Selling Channels</div>
                  <div className="text-slate-500 text-sm">
                    Choose all channels where you sell products or services
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">Organization Type</div>
                  <div className="text-slate-500 text-sm">
                    Select your organizational structure
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="text-blue-600 mt-1">
                  <Database className="size-5" />
                </div>
                <div>
                  <div className="text-blue-900 mb-1">Schema Preparation</div>
                  <p className="text-sm text-blue-700">
                    Based on your selections, we'll prepare the appropriate event schemas for your business model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schema State */}
        {step === 'schema' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-slate-900 mb-4">Data Schema Overview</h3>
              
              <div className="space-y-4">
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded p-2">
                      <Database className="size-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-blue-900 mb-2">User Schema (Profile)</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Customer profile and membership data
                      </p>
                      <div className="bg-white rounded border border-blue-200 p-3">
                        <div className="text-sm font-medium text-blue-900 mb-2">Example Fields:</div>
                        <div className="flex flex-wrap gap-2">
                          {['customer_id', 'email', 'phone', 'name', 'membership_level', 'points'].map(field => (
                            <code key={field} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {field}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded p-2">
                      <FileText className="size-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-purple-900 mb-2">Event Schema (Transactional Events)</h4>
                      <p className="text-sm text-purple-700 mb-3">
                        Behavioral and transactional records
                      </p>
                      <div className="bg-white rounded border border-purple-200 p-3">
                        <div className="text-sm font-medium text-purple-900 mb-2">Example Events:</div>
                        <div className="flex flex-wrap gap-2">
                          {['purchase', 'add_to_cart', 'view_product', 'checkout', 'payment_completed', 'order_shipped'].map(field => (
                            <code key={field} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                              {field}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="text-slate-900 mb-3">Enabled Marketing Scenarios</h4>
              <ul className="space-y-2">
                {[
                  'Revenue analysis by individual business unit',
                  'Membership change and upgrade tracking',
                  'Customer retention (>2 years) analysis',
                  'Online vs. offline data comparison',
                  'Multi-channel revenue attribution',
                ].map((scenario, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="text-blue-600">
                  <Database className="size-5 mt-0.5" />
                </div>
                <div>
                  <div className="text-blue-900 mb-1">Ready to Analyze</div>
                  <p className="text-sm text-blue-700">
                    Click "Analyze Example Data" to see how we assess your data quality and identify improvement opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload State */}
        {step === 'upload' && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Database className="size-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-600 mb-2">Ready for event data upload</h3>
              <p className="text-slate-400">
                Upload your transactional event data to begin analysis
              </p>
            </div>
          </div>
        )}

        {/* Assessment State - Map Data */}
        {step === 'assessment-map' && (
          <div className="space-y-6">
            <Scorecard score={readinessScore} />
            <ColumnMappingComponent mappings={columnMappings} onMappingChange={onMappingChange} />
            <DataTable dataRows={dataRows} issues={issues} />
          </div>
        )}

        {/* Assessment State - Check Data */}
        {step === 'assessment-check' && (
          <div className="space-y-6">
            <Scorecard score={readinessScore} />
            <DataQualityStats stats={columnStats} />
            <DataTable dataRows={dataRows} issues={issues} />
          </div>
        )}

        {/* Assessment State - DQB Rules */}
        {step === 'assessment-dqb' && (
          <div className="space-y-6">
            <Scorecard score={readinessScore} />
            <DQBRules rules={dqbRules} />
            <DataTable dataRows={dataRows} issues={issues} />
          </div>
        )}

        {/* Remediation State */}
        {step === 'remediation' && (
          <div className="space-y-6">
            <Scorecard score={readinessScore} />
            <DataTable dataRows={dataRows} issues={issues} />
          </div>
        )}

        {/* Final Report State */}
        {step === 'report' && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900">Final Readiness Report</h3>
                <FileText className="size-5 text-slate-400" />
              </div>

              <div className="text-center py-6 mb-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 mb-2">Overall Readiness Score</div>
                <div className="text-green-900">{readinessScore}%</div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <CheckCircle2 className="size-4" />
                    Ready for SA
                  </span>
                </div>
              </div>

              {/* Schema Mapping Summary */}
              <div className="mb-6">
                <h4 className="text-slate-700 mb-3">Schema Mapping Summary</h4>
                <div className="space-y-2">
                  {[
                    { field: 'user_id', mapped: 'customer_id', confidence: 95 },
                    { field: 'email', mapped: 'email_address', confidence: 98 },
                    { field: 'phone', mapped: 'phone_number', confidence: 92 },
                    { field: 'name', mapped: 'full_name', confidence: 100 },
                    { field: 'country', mapped: 'country_code', confidence: 88 },
                  ].map((mapping) => (
                    <div
                      key={mapping.field}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <code className="text-sm text-slate-600">{mapping.field}</code>
                        <span className="text-slate-400">→</span>
                        <code className="text-sm text-blue-600">{mapping.mapped}</code>
                      </div>
                      <div className="text-sm text-slate-500">
                        {mapping.confidence}% confidence
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Quality Summary */}
              <div>
                <h4 className="text-slate-700 mb-3">Data Quality Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <div className="text-sm text-slate-600">Completeness</div>
                    </div>
                    <div className="text-slate-900">91%</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <div className="text-sm text-slate-600">Consistency</div>
                    </div>
                    <div className="text-slate-900">88%</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <div className="text-sm text-slate-600">Validity</div>
                    </div>
                    <div className="text-slate-900">94%</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <div className="text-sm text-slate-600">Uniqueness</div>
                    </div>
                    <div className="text-slate-900">97%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="text-slate-700 mb-3">Cleaned Data Preview</h4>
              <DataTable dataRows={dataRows} issues={[]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}