import { useState } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { DataWorkspace } from './components/DataWorkspace';

export type Step = 'website' | 'review' | 'business-model' | 'schema' | 'upload' | 'assessment-map' | 'assessment-check' | 'assessment-dqb' | 'remediation' | 'report';

export interface ProjectContext {
  website: string;
  brandName: string;
  description: string;
  industry: string;
  region: string;
  sellingModels: string[];
  organizationStructure: string;
}

export interface ExtractedInfo {
  brandName: string;
  description: string;
  industry: string;
  region: string;
}

export interface DataIssue {
  id: string;
  severity: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  column?: string;
  fixed: boolean;
}

export interface ColumnMapping {
  sourceColumn: string; // Column from uploaded CSV
  standardField: string; // Target field in standard schema
  confidence: number;
  status: 'mapped' | 'suggested' | 'missing' | 'extra';
  semanticDescription?: string; // Semantic meaning of the field
  exampleValue?: string; // Example value for the field
}

export interface ColumnStats {
  column: string;
  nullPercent: number;
  uniquePercent: number;
  completeness: number;
  topValues: { value: string; count: number }[];
}

export interface DQBRule {
  id: string;
  category: 'standardize' | 'clean' | 'enrich';
  title: string;
  description: string;
  column: string;
  example: string;
  applied: boolean;
}

export interface DataRow {
  event_id: string;
  event_type: string;
  user_id: string;
  timestamp: string;
  product_id: string;
  revenue: string;
  channel: string;
}

export default function App() {
  const [step, setStep] = useState<Step>('website');
  const [projectContext, setProjectContext] = useState<ProjectContext>({
    website: '',
    brandName: '',
    description: '',
    industry: '',
    region: '',
    sellingModels: [],
    organizationStructure: '',
  });
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dataRows, setDataRows] = useState<DataRow[]>([]);
  const [issues, setIssues] = useState<DataIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [readinessScore, setReadinessScore] = useState(0);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [columnStats, setColumnStats] = useState<ColumnStats[]>([]);
  const [dqbRules, setDQBRules] = useState<DQBRule[]>([]);

  const handleWebsiteSubmit = (website: string) => {
    // Simulate Appier extraction
    setTimeout(() => {
      const extracted: ExtractedInfo = {
        brandName: 'Example Corp',
        description: 'Leading e-commerce platform in Taiwan',
        industry: 'E-commerce',
        region: 'Taiwan / APAC',
      };
      setExtractedInfo(extracted);
      setProjectContext(prev => ({
        ...prev,
        website,
        ...extracted,
      }));
      setStep('review');
    }, 1500);
  };

  const handleReviewConfirm = () => {
    setStep('business-model');
  };

  const handleBusinessModelConfirm = (sellingModels: string[], organizationStructure: string) => {
    setProjectContext(prev => ({
      ...prev,
      sellingModels,
      organizationStructure,
    }));
    setStep('schema');
  };

  const handleSchemaConfirm = () => {
    setStep('upload');
  };

  const handleContextSubmit = (context: ProjectContext) => {
    setProjectContext(context);
    setStep('upload');
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate data processing
    simulateDataProcessing();
    setStep('assessment-map');
  };

  const simulateDataProcessing = () => {
    // Mock transactional event data with issues
    const mockData: DataRow[] = [
      { event_id: 'E001', event_type: 'purchase', user_id: 'U001', timestamp: '2023-10-01T10:00:00Z', product_id: 'P001', revenue: '100.00', channel: 'web' },
      { event_id: 'E002', event_type: 'purchase', user_id: '$n/a$', timestamp: '2023-10-01 10:05:00', product_id: 'P002', revenue: '150.00', channel: 'web' },
      { event_id: 'E003', event_type: 'add_to_cart', user_id: 'U003', timestamp: '2023-10-01T10:10:00Z', product_id: 'P003', revenue: '', channel: 'mobile' },
      { event_id: 'E004', event_type: 'purchase', user_id: '$n/a$', timestamp: '2023-10-01 10:15:00', product_id: 'P004', revenue: '250.00', channel: 'web' },
      { event_id: 'E005', event_type: 'view_product', user_id: 'U005', timestamp: '2023-10-01T10:20:00Z', product_id: 'P005', revenue: '', channel: 'mobile' },
    ];

    // Column mappings - AI schema detection
    const mockMappings: ColumnMapping[] = [
      { 
        sourceColumn: 'event_name', 
        standardField: 'event_name', 
        confidence: 100, 
        status: 'mapped',
        semanticDescription: 'The name or type of the transactional event',
        exampleValue: 'checkout_completed'
      },
      { 
        sourceColumn: 'event_id', 
        standardField: 'order_id', 
        confidence: 95, 
        status: 'mapped',
        semanticDescription: 'Unique identifier for each transaction or order',
        exampleValue: 'ORD_12345'
      },
      { 
        sourceColumn: 'user_id', 
        standardField: 'customer_id', 
        confidence: 92, 
        status: 'mapped',
        semanticDescription: 'Unique identifier for the customer making the transaction',
        exampleValue: 'CUST_67890'
      },
      { 
        sourceColumn: 'timestamp', 
        standardField: 'event_timestamp', 
        confidence: 100, 
        status: 'mapped',
        semanticDescription: 'Date and time when the event occurred',
        exampleValue: '2023-10-01T10:00:00Z'
      },
      { 
        sourceColumn: 'product_id', 
        standardField: 'item_id', 
        confidence: 98, 
        status: 'mapped',
        semanticDescription: 'Unique identifier for the product or item in the transaction',
        exampleValue: 'ITEM_001'
      },
      { 
        sourceColumn: 'revenue', 
        standardField: 'order_value', 
        confidence: 88, 
        status: 'mapped',
        semanticDescription: 'Monetary value of the transaction',
        exampleValue: '100.00'
      },
      { 
        sourceColumn: '', 
        standardField: 'order_status', 
        confidence: 0, 
        status: 'missing',
        semanticDescription: 'Current status of the order',
        exampleValue: 'completed'
      },
      { 
        sourceColumn: '', 
        standardField: 'payment_method', 
        confidence: 0, 
        status: 'missing',
        semanticDescription: 'Method used for payment',
        exampleValue: 'credit_card'
      },
      { 
        sourceColumn: 'channel', 
        standardField: '', 
        confidence: 0, 
        status: 'extra',
        semanticDescription: 'Sales or acquisition channel',
        exampleValue: 'web'
      },
    ];

    // Column statistics
    const mockStats: ColumnStats[] = [
      {
        column: 'event_id',
        nullPercent: 0,
        uniquePercent: 100,
        completeness: 100,
        topValues: [
          { value: 'E001', count: 1 },
          { value: 'E002', count: 1 },
          { value: 'E003', count: 1 },
        ],
      },
      {
        column: 'event_type',
        nullPercent: 0,
        uniquePercent: 60,
        completeness: 100,
        topValues: [
          { value: 'purchase', count: 3 },
          { value: 'add_to_cart', count: 1 },
          { value: 'view_product', count: 1 },
        ],
      },
      {
        column: 'user_id',
        nullPercent: 40,
        uniquePercent: 80,
        completeness: 60,
        topValues: [
          { value: '$n/a$', count: 2 },
          { value: 'U001', count: 1 },
          { value: 'U003', count: 1 },
        ],
      },
      {
        column: 'timestamp',
        nullPercent: 0,
        uniquePercent: 100,
        completeness: 100,
        topValues: [
          { value: '2023-10-01T10:00:00Z', count: 1 },
          { value: '2023-10-01 10:05:00', count: 1 },
        ],
      },
      {
        column: 'revenue',
        nullPercent: 40,
        uniquePercent: 75,
        completeness: 60,
        topValues: [
          { value: '100.00', count: 1 },
          { value: '150.00', count: 1 },
          { value: '250.00', count: 1 },
        ],
      },
    ];

    // DQB Rules
    const mockRules: DQBRule[] = [
      {
        id: 'rule-1',
        category: 'standardize',
        title: 'Normalize Revenue Format',
        description: 'Standardize revenue values to 2 decimal places with currency',
        column: 'revenue',
        example: '100.00 → USD 100.00',
        applied: false,
      },
      {
        id: 'rule-2',
        category: 'clean',
        title: 'Replace Null User IDs',
        description: 'Replace "$n/a$" with proper null handling or generate anonymous IDs',
        column: 'user_id',
        example: '$n/a$ → ANON_12345',
        applied: false,
      },
      {
        id: 'rule-3',
        category: 'standardize',
        title: 'Standardize Timestamp Format',
        description: 'Convert all timestamps to ISO 8601 format',
        column: 'timestamp',
        example: '2023-10-01 10:05:00 → 2023-10-01T10:05:00Z',
        applied: false,
      },
      {
        id: 'rule-4',
        category: 'enrich',
        title: 'Add Order Status',
        description: 'Derive order status from event_type (purchase → completed, add_to_cart → pending)',
        column: 'order_status',
        example: 'purchase → "completed"',
        applied: false,
      },
    ];

    const mockIssues: DataIssue[] = [
      {
        id: 'issue-1',
        severity: 'warning',
        title: 'Standardize User Identifiers',
        description: 'user_id contains "$n/a$" values in event records',
        column: 'user_id',
        fixed: false,
      },
      {
        id: 'issue-2',
        severity: 'error',
        title: 'Normalize Timestamp Format',
        description: 'Inconsistent timestamp formats detected (ISO vs. datetime)',
        column: 'timestamp',
        fixed: false,
      },
      {
        id: 'issue-3',
        severity: 'info',
        title: 'Validate Revenue Data',
        description: 'Missing revenue values for non-purchase events',
        column: 'revenue',
        fixed: false,
      },
    ];

    setDataRows(mockData);
    setColumnMappings(mockMappings);
    setColumnStats(mockStats);
    setDQBRules(mockRules);
    setIssues(mockIssues);
    setReadinessScore(83);
  };

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    setStep('remediation');
  };

  const handleApplyFix = () => {
    if (!selectedIssue) return;

    const issue = issues.find(i => i.id === selectedIssue);
    if (!issue) return;

    // Apply fix based on issue type
    let updatedData = [...dataRows];
    
    if (issue.id === 'issue-1') {
      // Fix $n/a$ values
      updatedData = updatedData.map(row => ({
        ...row,
        user_id: row.user_id === '$n/a$' ? '' : row.user_id,
      }));
      setReadinessScore(88);
    } else if (issue.id === 'issue-2') {
      // Fix timestamp formats
      updatedData = updatedData.map(row => ({
        ...row,
        timestamp: row.timestamp.includes('T') ? row.timestamp : new Date(row.timestamp).toISOString(),
      }));
      setReadinessScore(prev => prev + 5);
    } else if (issue.id === 'issue-3') {
      // Add revenue for purchase events
      updatedData = updatedData.map(row => ({
        ...row,
        revenue: row.event_type === 'purchase' && !row.revenue ? '0.00' : row.revenue,
      }));
      setReadinessScore(prev => prev + 2);
    }

    setDataRows(updatedData);
    
    // Mark issue as fixed
    setIssues(issues.map(i => 
      i.id === selectedIssue ? { ...i, fixed: true } : i
    ));

    // Check if all issues are fixed
    const allFixed = issues.every(i => i.id === selectedIssue || i.fixed);
    if (allFixed) {
      setReadinessScore(90);
      setTimeout(() => setStep('report'), 1000);
    } else {
      setSelectedIssue(null);
      setStep('assessment');
    }
  };

  const handleIgnoreFix = () => {
    setSelectedIssue(null);
    setStep('assessment-map');
  };

  const handleNextAssessment = () => {
    if (step === 'assessment-map') {
      setStep('assessment-check');
    } else if (step === 'assessment-check') {
      setStep('assessment-dqb');
    } else if (step === 'assessment-dqb') {
      setStep('report');
    }
  };

  const handleMappingChange = (sourceColumn: string, newStandardField: string) => {
    setColumnMappings(prev => 
      prev.map(mapping => 
        mapping.sourceColumn === sourceColumn 
          ? { ...mapping, standardField: newStandardField }
          : mapping
      )
    );
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <ChatPanel
        step={step}
        projectContext={projectContext}
        extractedInfo={extractedInfo}
        onWebsiteSubmit={handleWebsiteSubmit}
        onReviewConfirm={handleReviewConfirm}
        onBusinessModelConfirm={handleBusinessModelConfirm}
        onSchemaConfirm={handleSchemaConfirm}
        onContextSubmit={handleContextSubmit}
        onFileUpload={handleFileUpload}
        issues={issues}
        selectedIssue={selectedIssue}
        onIssueSelect={handleIssueSelect}
        onApplyFix={handleApplyFix}
        onIgnoreFix={handleIgnoreFix}
        readinessScore={readinessScore}
        onNextAssessment={handleNextAssessment}
      />
      <DataWorkspace
        step={step}
        dataRows={dataRows}
        issues={issues}
        readinessScore={readinessScore}
        projectContext={projectContext}
        extractedInfo={extractedInfo}
        columnMappings={columnMappings}
        columnStats={columnStats}
        dqbRules={dqbRules}
        onMappingChange={handleMappingChange}
      />
    </div>
  );
}