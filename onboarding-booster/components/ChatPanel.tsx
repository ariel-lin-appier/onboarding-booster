import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Upload,
  Bot,
  CheckCircle2,
  Loader2,
  Globe,
  Smartphone,
  Store,
  Users,
  ShoppingBag,
  Package,
} from "lucide-react";
import {
  ProjectContext,
  DataIssue,
  Step,
  ExtractedInfo,
} from "../App";
import { IssuesList } from "./IssuesList";

interface ChatPanelProps {
  step: Step;
  projectContext: ProjectContext;
  extractedInfo: ExtractedInfo | null;
  onWebsiteSubmit: (website: string) => void;
  onReviewConfirm: () => void;
  onBusinessModelConfirm: (
    sellingModels: string[],
    organizationStructure: string,
  ) => void;
  onSchemaConfirm: () => void;
  onFileUpload: (file: File) => void;
  issues: DataIssue[];
  selectedIssue: string | null;
  onIssueSelect: (issueId: string) => void;
  onApplyFix: () => void;
  onIgnoreFix: () => void;
  readinessScore: number;
  onNextAssessment: () => void;
}

export function ChatPanel({
  step,
  projectContext,
  extractedInfo,
  onWebsiteSubmit,
  onReviewConfirm,
  onBusinessModelConfirm,
  onSchemaConfirm,
  onFileUpload,
  issues,
  selectedIssue,
  onIssueSelect,
  onApplyFix,
  onIgnoreFix,
  readinessScore,
  onNextAssessment,
}: ChatPanelProps) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedSellingModels, setSelectedSellingModels] =
    useState<string[]>([]);
  const [selectedOrgStructure, setSelectedOrgStructure] =
    useState("");

  const sellingModelOptions = [
    {
      id: "online-web",
      label: "Online (Web)",
      description: "E-commerce website",
      icon: Globe,
    },
    {
      id: "online-mobile",
      label: "Online (Mobile)",
      description: "Mobile app or PWA",
      icon: Smartphone,
    },
    {
      id: "in-store",
      label: "In-Store",
      description: "Physical retail locations",
      icon: Store,
    },
    {
      id: "distributors",
      label: "Distributors",
      description: "Through distribution network",
      icon: Users,
    },
    {
      id: "resellers",
      label: "Resellers",
      description: "Partner resellers",
      icon: ShoppingBag,
    },
    {
      id: "3rd-party",
      label: "3rd-Party Marketplace",
      description: "Amazon, eBay, etc.",
      icon: Package,
    },
  ];

  const orgStructureOptions = [
    {
      id: "single-brand",
      label: "Single Brand",
      description: "One brand operating in one market",
    },
    {
      id: "multiple-brands",
      label: "Multiple Brands",
      description: "Multiple brands under one organization",
    },
    {
      id: "multiple-regions",
      label: "Multiple Regions",
      description:
        "Operating across different geographical regions",
    },
  ];

  const toggleSellingModel = (modelId: string) => {
    setSelectedSellingModels((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId],
    );
  };

  const getExpectedSchemas = () => {
    const schemas: string[] = [];
    if (selectedSellingModels.includes("in-store")) {
      schemas.push("POS events: transaction, payment, receipt");
    }
    if (
      selectedSellingModels.includes("3rd-party") ||
      selectedSellingModels.includes("resellers") ||
      selectedSellingModels.includes("distributors")
    ) {
      schemas.push(
        "Partner events: order_created, fulfillment, return",
      );
    }
    return schemas;
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExtracting(true);
    onWebsiteSubmit(websiteUrl);
    setTimeout(() => setIsExtracting(false), 1500);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const selectedIssueData = issues.find(
    (i) => i.id === selectedIssue,
  );

  return (
    <div className="w-[40%] bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Bot className="size-6 text-blue-600" />
          <h1 className="text-slate-900">
            Appier Data Readiness Agent
          </h1>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Welcome Message */}
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="size-4 text-blue-600" />
            </div>
          </div>
          <div className="bg-slate-100 rounded-lg p-4 flex-1">
            <p className="text-slate-700">
              Hi! I'm Appier's Data Readiness Agent. I'll help
              you prepare your data for onboarding to Audience
              Agent. Let's start by understanding your business.
            </p>
          </div>
        </div>

        {/* Step 1: Website Input */}
        {step === "website" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Please enter your company website URL:
                </p>
              </div>
            </div>

            <form
              onSubmit={handleWebsiteSubmit}
              className="space-y-3 ml-11"
            >
              <Input
                type="url"
                placeholder="https://www.yourcompany.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
                disabled={isExtracting}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isExtracting}
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Extracting information...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>

            {isExtracting && (
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="size-4 text-blue-600" />
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
                  <p className="text-blue-800">
                    🔍 Analyzing your website and extracting
                    company information...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Review Extracted Info */}
        {step === "review" && extractedInfo && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700 mb-3">
                  Great! I've extracted the following
                  information from your website:
                </p>
                <div className="space-y-2 bg-white rounded border border-slate-200 p-3">
                  <div>
                    <span className="text-slate-500 text-sm">
                      Brand Name:
                    </span>
                    <p className="text-slate-900">
                      {extractedInfo.brandName}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">
                      Description:
                    </span>
                    <p className="text-slate-900">
                      {extractedInfo.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">
                      Industry:
                    </span>
                    <p className="text-slate-900">
                      {extractedInfo.industry}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">
                      Region:
                    </span>
                    <p className="text-slate-900">
                      {extractedInfo.region}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Does this look correct?
                </p>
              </div>
            </div>

            <div className="ml-11">
              <Button
                onClick={onReviewConfirm}
                className="w-full"
              >
                Yes, Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Business Model Selection */}
        {step === "business-model" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Great! Now I need to understand your business
                  model to prepare the right data schemas.
                  Please select your selling channels and
                  organization structure.
                </p>
              </div>
            </div>

            <div className="ml-11 space-y-6">
              {/* Selling Models */}
              <div>
                <h3 className="text-slate-900 mb-1">
                  Selling Models
                </h3>
                <p className="text-slate-500 text-sm mb-3">
                  Select all channels where you sell your
                  products or services. This helps us prepare
                  the right event schemas.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {sellingModelOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected =
                      selectedSellingModels.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          toggleSellingModel(option.id)
                        }
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <div
                            className={`mt-0.5 ${isSelected ? "text-blue-600" : "text-slate-400"}`}
                          >
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1">
                            <div
                              className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-slate-900"}`}
                            >
                              {option.label}
                            </div>
                            <div
                              className={`text-xs ${isSelected ? "text-blue-700" : "text-slate-500"}`}
                            >
                              {option.description}
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="size-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Expected Schemas Preview */}
                {selectedSellingModels.length > 0 &&
                  getExpectedSchemas().length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="text-sm text-blue-900 mb-1">
                        Expected schemas for your selection:
                      </div>
                      <ul className="text-xs text-blue-700 space-y-1">
                        {getExpectedSchemas().map(
                          (schema, i) => (
                            <li key={i}>• {schema}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>

              {/* Organization Structure */}
              <div>
                <h3 className="text-slate-900 mb-1">
                  Organization Structure
                </h3>
                <p className="text-slate-500 text-sm mb-3">
                  Help us understand your organizational
                  structure for proper data segmentation.
                </p>
                <div className="space-y-2">
                  {orgStructureOptions.map((option) => {
                    const isSelected =
                      selectedOrgStructure === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          setSelectedOrgStructure(option.id)
                        }
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <div
                              className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-slate-900"}`}
                            >
                              {option.label}
                            </div>
                            <div
                              className={`text-xs ${isSelected ? "text-blue-700" : "text-slate-500"}`}
                            >
                              {option.description}
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="size-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={() =>
                  onBusinessModelConfirm(
                    selectedSellingModels,
                    selectedOrgStructure,
                  )
                }
                className="w-full"
                disabled={
                  selectedSellingModels.length === 0 ||
                  !selectedOrgStructure
                }
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Schema Introduction */}
        {step === "schema" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700 mb-3">
                  Perfect! Now let me explain about{" "}
                  <span className="font-medium">
                    data schemas
                  </span>
                  .
                </p>
                <p className="text-slate-700 mb-3">
                  To power AI-driven marketing, Appier needs two
                  types of data:
                </p>
                <div className="space-y-3 mt-3">
                  <div className="bg-white rounded border border-slate-200 p-3">
                    <div className="font-medium text-slate-900 mb-1">
                      📋 User Schema (Profile Data)
                    </div>
                    <p className="text-sm text-slate-600">
                      Customer profile information like
                      membership data, demographics, and contact
                      details
                    </p>
                  </div>
                  <div className="bg-white rounded border border-slate-200 p-3">
                    <div className="font-medium text-slate-900 mb-1">
                      📊 Event Schema (Transactional Events)
                    </div>
                    <p className="text-sm text-slate-600">
                      Behavioral records like purchases, page
                      views, add-to-cart, and order events
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  These schemas enable use cases like:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
                  <li>Revenue analysis by business unit</li>
                  <li>Membership change tracking</li>
                  <li>Cross-channel attribution</li>
                  <li>Customer retention analysis</li>
                  <li>Personalized campaign targeting</li>
                </ul>
              </div>
            </div>

            <div className="ml-11">
              <Button
                onClick={onSchemaConfirm}
                className="w-full"
              >
                Continue to Upload
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: File Upload - Event Data */}
        {step === "upload" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Now let's upload your{" "}
                  <span className="font-medium">
                    Event Data (Transactional Events)
                  </span>
                  . Please upload a sample CSV file containing
                  your transactional records.
                </p>
              </div>
            </div>

            <div className="ml-11">
              <label
                htmlFor="file-upload"
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <Upload className="size-10 text-slate-400 mb-3" />
                <p className="text-slate-600 mb-1">
                  Drag & drop CSV or click to upload
                </p>
                <p className="text-slate-400 text-sm">
                  (Event data: purchase, add_to_cart,
                  view_product, etc.)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* Step 6a: Assessment - Map Data */}
        {step === "assessment-map" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Analysis complete! Your data readiness is{" "}
                  <span className="font-medium text-blue-600">
                    {readinessScore}%
                  </span>
                  .
                </p>
                <p className="text-slate-700 mt-2">
                  Let's start with the first assessment:{" "}
                  <span className="font-medium">Map Data</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <div className="font-medium text-slate-900 mb-2">
                  1. Map Data - AI Schema Detection
                </div>
                <p className="text-slate-600 text-sm mb-2">
                  I've automatically mapped your source columns
                  to our standard schema:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>
                    ✓ 6 columns successfully mapped with high
                    confidence
                  </li>
                  <li>
                    ⚠️ 2 missing fields: order_status,
                    payment_method
                  </li>
                  <li>
                    • 1 extra column: channel (not in standard
                    schema)
                  </li>
                </ul>
                <p className="text-slate-600 text-sm mt-3">
                  You can edit the mappings directly in the
                  right panel if needed.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Review the detailed mapping on the right. When
                  ready, let's move to the next assessment.
                </p>
              </div>
            </div>

            <div className="ml-11">
              <Button
                onClick={onNextAssessment}
                className="w-full"
              >
                Continue to Check Data
              </Button>
            </div>
          </div>
        )}

        {/* Step 6b: Assessment - Check Data */}
        {step === "assessment-check" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <div className="font-medium text-slate-900 mb-2">
                  2. Check Data - Quality Statistics
                </div>
                <p className="text-slate-600 text-sm mb-2">
                  I've analyzed the data quality metrics for
                  each column:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>
                    • Null percentages: user_id (40%), revenue
                    (40%)
                  </li>
                  <li>
                    • Completeness: Average 84% across all
                    columns
                  </li>
                  <li>
                    • Unique values and top value distributions
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Review the detailed statistics on the right.
                  The quality metrics will help us create
                  improvement rules.
                </p>
              </div>
            </div>

            <div className="ml-11">
              <Button
                onClick={onNextAssessment}
                className="w-full"
              >
                Continue to DQB Rules
              </Button>
            </div>
          </div>
        )}

        {/* Step 6c: Assessment - DQB Rules */}
        {step === "assessment-dqb" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <div className="font-medium text-slate-900 mb-2">
                  3. Clean & Standardize - DQB Rules
                </div>
                <p className="text-slate-600 text-sm mb-2">
                  Based on the analysis, I've created 4 Data
                  Quality Booster rules:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>
                    🪄 2 Standardize rules (format
                    normalization)
                  </li>
                  <li>✨ 1 Clean rule (fix invalid data)</li>
                  <li>✓ 1 Enrich rule (add missing fields)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Review the suggested rules on the right. You
                  can apply them individually or proceed to see
                  the final report.
                </p>
              </div>
            </div>

            <div className="ml-11">
              <Button
                onClick={onNextAssessment}
                className="w-full"
              >
                Generate Final Report
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Remediation */}
        {step === "remediation" && selectedIssueData && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700 mb-3">
                  <span className="font-medium">
                    {selectedIssueData.title}
                  </span>
                </p>
                <p className="text-slate-600 text-sm">
                  {selectedIssueData.description}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  {selectedIssueData.id === "issue-1" &&
                    "I can fix the `$n/a$` values by setting them to null."}
                  {selectedIssueData.id === "issue-2" &&
                    "I can remove extra spaces from email addresses."}
                  {selectedIssueData.id === "issue-3" &&
                    "I can add the +886 country code to all phone numbers."}
                </p>
              </div>
            </div>

            <div className="ml-11 flex gap-3">
              <Button onClick={onApplyFix} className="flex-1">
                <CheckCircle2 className="size-4 mr-2" />
                Apply Fix
              </Button>
              <Button
                onClick={onIgnoreFix}
                variant="outline"
                className="flex-1"
              >
                Skip
              </Button>
            </div>
          </div>
        )}

        {/* Step 8: Final Report */}
        {step === "report" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="size-4 text-green-600" />
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1">
                <p className="text-green-800 mb-2">
                  🎉 Excellent! Your data is ready for Audience
                  Agent.
                </p>
                <p className="text-green-700 text-sm">
                  Readiness Score:{" "}
                  <span className="font-medium">
                    {readinessScore}%
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4 flex-1">
                <p className="text-slate-700">
                  Your data is now ready for advanced marketing
                  scenarios. Check the workspace for detailed
                  schema mapping and quality metrics.
                </p>
              </div>
            </div>

            <div className="ml-11 space-y-3">
              <Button className="w-full">
                Download Readiness Report
              </Button>
              <Button variant="outline" className="w-full">
                Schedule Review with Appier Team
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}