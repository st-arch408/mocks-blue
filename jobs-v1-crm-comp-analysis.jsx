import { useState } from "react";

const platforms = [
  {
    id: "jobs",
    name: "QXO Jobs V1",
    tagline: "Address-anchored, zero-config project record",
    color: "#0055FF",
    accent: "#E8F0FE",
    isTarget: true,
    dataModel: {
      primary: "Property Address",
      hierarchy: ["Address", "Trade Scope", "Estimate / Order / Delivery / Invoice", "Margin + Rebate"],
      description: "The address IS the job. Every transaction auto-attaches. No manual creation step exists."
    },
    lifecycle: {
      steps: [
        { label: "ATB Blue / Build", auto: true, desc: "Contractor starts estimate → Job auto-creates at address" },
        { label: "Proposal Sent", auto: true, desc: "Good-better-best proposal generated, tracked inside Job" },
        { label: "Homeowner Accepts", auto: true, desc: "E-signature triggers measurement upgrade + order" },
        { label: "Order Placed", auto: true, desc: "Materials fire to branch — branch or digital, always captured" },
        { label: "Delivery Tracked", auto: true, desc: "GPS tracking, delivery window, proof-of-delivery photos" },
        { label: "Invoice + Margin", auto: true, desc: "Actual invoiced cost vs. proposal price = realized margin" },
      ],
      autoCount: 6,
      manualCount: 0,
    },
    uxPatterns: [
      { pattern: "Timeline Feed", desc: "Events appear chronologically as they happen — no tabs to navigate, no filing cabinet to organize. Tap an address, see the whole story." },
      { pattern: "Zero-Config Creation", desc: "Jobs create themselves from transactions. The contractor never 'sets up a project.' The workflow IS the project." },
      { pattern: "Actual Margin", desc: "Realized margin from real invoiced costs — not estimated order amounts. Returns, credits, and adjustments auto-calculate." },
      { pattern: "Multi-Trade Scopes", desc: "One address holds roofing, siding, gutters as separate scopes — each with own P&L. The address is the orchestra, trades are sections." },
      { pattern: "Branch + Digital Unified", desc: "Phone orders, walk-in orders, digital orders all write to the same Job. No 'offline gap.'" },
    ],
    strengths: ["Zero manual entry", "Actual cost margin", "Address = primary key", "Free (distributor-funded)", "Branch + digital unified"],
    gaps: ["No lead management (V1)", "No crew scheduling (V1)", "No accounting integration (V1)", "No homeowner comms tools (V1)"],
    pricing: "Free — built on QXO supply chain data",
    marginTracking: "Automatic: actual invoiced cost vs. proposal price",
    supplierIntegration: "Native — QXO IS the supplier",
  },
  {
    id: "acculynx",
    name: "AccuLynx",
    tagline: "Roofing-specific CRM with deep distributor integrations",
    color: "#1B8A3E",
    accent: "#E8F5EC",
    isTarget: false,
    dataModel: {
      primary: "Job File",
      hierarchy: ["Contact", "Job File", "Estimates / Financials / Materials / Photos / Docs", "Milestone → Status → Checklist"],
      description: "Contact-centric model. Job File is a tabbed container that holds everything — but contractor must create it first."
    },
    lifecycle: {
      steps: [
        { label: "Lead Created", auto: false, desc: "Contractor manually enters lead from call, form, or referral" },
        { label: "Job File Created", auto: false, desc: "Lead converts to Job — contractor configures trade, workflow" },
        { label: "Estimate Built", auto: false, desc: "Line items entered manually; measurements from EagleView/Hover" },
        { label: "Material Order", auto: false, desc: "Estimate converts to order via ABC/SRS/QXO integration" },
        { label: "Delivery Tracked", auto: true, desc: "Order status + delivery photos from distributor integration" },
        { label: "Financial Worksheet", auto: false, desc: "Auto-fills FROM estimate — uses order cost, not actual invoice" },
      ],
      autoCount: 1,
      manualCount: 5,
    },
    uxPatterns: [
      { pattern: "Tabbed Job File", desc: "Everything lives in tabs: contacts, estimates, financials, materials, photos, docs, crew. Functional but dense — designed for office managers, not field operators." },
      { pattern: "Workflow Manager", desc: "Configurable Milestone → Status pipeline with checklists. Linear progression per job — Kanban-adjacent but more rigid." },
      { pattern: "Financial Worksheet", desc: "Auto-populates from primary estimate. Calculates margin from ORDER cost (not actual invoiced). Falls 2025 added per-trade profitability." },
      { pattern: "Distributor Ordering", desc: "Deepest integrations: ABC, SRS, QXO. Real-time pricing, direct ordering, delivery tracking, POD photos. But actual invoices don't flow back." },
      { pattern: "Multi-Trade in One Job", desc: "Trade designations within a single Job File. Per-trade revenue/expense tracking added Fall 2025. Not separate scope entities." },
    ],
    strengths: ["Deepest distributor integrations", "Configurable workflows per trade", "Per-trade profitability (new)", "Comprehensive Job File container", "Strong photo documentation"],
    gaps: ["No actual-cost reconciliation", "Contact-centric, not address-centric", "No free tier", "Desktop-first UX density", "Manual job creation required"],
    pricing: "Essential: $250/mo flat; Pro/Elite: ~$60–120/user/mo",
    marginTracking: "Estimated: order cost from estimate, not actual invoiced amounts",
    supplierIntegration: "ABC Supply, SRS, QXO — ordering + tracking, no invoice return",
  },
  {
    id: "servicetitan",
    name: "ServiceTitan",
    tagline: "Enterprise field service platform expanding into roofing",
    color: "#6B21A8",
    accent: "#F3E8FF",
    isTarget: false,
    dataModel: {
      primary: "Location",
      hierarchy: ["Customer", "Location", "Project", "Job → Appointment"],
      description: "Location is a first-class entity — closest to address-anchored. But buried inside enterprise complexity at $250–500/tech/mo."
    },
    lifecycle: {
      steps: [
        { label: "Call / Booking", auto: false, desc: "Customer record created manually or from inbound call" },
        { label: "Location Created", auto: false, desc: "Address entered as Location entity under Customer" },
        { label: "Estimate Built", auto: false, desc: "Branded presentation with good-better-best. Material qty defaults to zero." },
        { label: "Project Auto-Created", auto: true, desc: "When estimate sold + booked, Project auto-generates grouping jobs" },
        { label: "PO / Procurement", auto: false, desc: "Full Procurement Integration with distributors. Roofing integrations still maturing." },
        { label: "Budget vs. Actuals", auto: false, desc: "Project-level cost tracking. Requires add-on + careful configuration." },
      ],
      autoCount: 1,
      manualCount: 5,
    },
    uxPatterns: [
      { pattern: "Customer → Location Hierarchy", desc: "Location is a distinct addressable entity — property notes, equipment history, service history. Architecturally the closest to Jobs' address model." },
      { pattern: "Project Grouping", desc: "Projects auto-create when estimates are sold. Group related jobs at one location. Budget vs. Actuals at project level." },
      { pattern: "Business Units", desc: "Multi-trade via BU assignment. Each job belongs to a BU (Roofing Sales, HVAC Install). Projects span BUs." },
      { pattern: "Full Procurement", desc: "Most ambitious integration framework: catalog sync, branch pricing (nightly), electronic POs. Roofing distributor integrations newer (2024–2025)." },
      { pattern: "KPI Dashboard", desc: "Revenue tiles, close rates, average ticket, tech performance. Data-heavy, designed for ops managers running 50+ person teams." },
    ],
    strengths: ["Location as first-class entity", "Budget vs. Actuals reporting", "Full procurement framework", "Enterprise-grade analytics", "Auto project creation from estimate"],
    gaps: ["$50K–70K Year 1 cost", "Roofing features still maturing", "Extreme configuration complexity", "Not accessible to small contractors", "Material qty defaults to zero in estimates"],
    pricing: "~$245–500/tech/mo + $5K–50K implementation",
    marginTracking: "Budget vs. Actuals (add-on). Partial actual cost for HVAC; roofing newer.",
    supplierIntegration: "ABC, SRS, QXO — full procurement framework, roofing integrations newer",
  },
  {
    id: "jobnimbus",
    name: "JobNimbus",
    tagline: "Approachable CRM for small roofing/exterior contractors",
    color: "#D97706",
    accent: "#FEF3C7",
    isTarget: false,
    dataModel: {
      primary: "Contact → Job",
      hierarchy: ["Contact", "Job", "Estimates / Invoices / Work Orders / Material Orders", "Profit Tracker"],
      description: "Two-level parent-child. Contact is top-level, Jobs are children. No Property entity — address is just a field."
    },
    lifecycle: {
      steps: [
        { label: "Contact Created", auto: false, desc: "Manually entered. Sales rep assignment doesn't carry to job." },
        { label: "Job Created", auto: false, desc: "Child record under Contact. Address inherited but editable." },
        { label: "Estimate Built", auto: false, desc: "Line items entered manually. Measurements from integrations." },
        { label: "Material Order", auto: false, desc: "One-click estimate-to-order via ABC/SRS/QXO integration" },
        { label: "Delivery Notification", auto: true, desc: "Notifications from ABC/SRS when delivery en route or completed" },
        { label: "Profit Tracker", auto: false, desc: "Planned revenue minus planned costs. Uses ORDER amounts, not actuals." },
      ],
      autoCount: 1,
      manualCount: 5,
    },
    uxPatterns: [
      { pattern: "Kanban Board", desc: "Clean column-based pipeline view. Most approachable UI for small contractors. Jobs drag between stages visually." },
      { pattern: "Contact → Job Split", desc: "One contact, multiple jobs. Solves repeat-customer problem but creates data inheritance friction (sales rep, notes don't always carry)." },
      { pattern: "Profit Tracker", desc: "Simple per-job P&L: revenue minus material + labor costs. All manually entered or from order amounts. No actual cost reconciliation." },
      { pattern: "Automation Engine", desc: "Trigger-based automations for stage changes, notifications, task creation. Reduces manual workflow steps." },
      { pattern: "Mobile-Friendly", desc: "Cleaner mobile experience than AccuLynx or ServiceTitan. Designed for contractors in the field, not just office." },
    ],
    strengths: ["Most approachable UI", "Clean Kanban pipeline", "Good mobile experience", "Multiple jobs per contact", "Automation engine"],
    gaps: ["No property/address entity", "Planned costs only (not actuals)", "Sales rep doesn't carry from contact to job", "Limited multi-trade support", "No free tier"],
    pricing: "~$225–550/mo base + $20–75/user/mo by role",
    marginTracking: "Planned only: order amounts, not actual invoiced costs",
    supplierIntegration: "ABC Supply, SRS, QXO — ordering + delivery notifications",
  },
  {
    id: "roofhub",
    name: "SRS RoofHub",
    tagline: "Distributor portal with all the data but no project wrapper",
    color: "#DC2626",
    accent: "#FEE2E2",
    isTarget: false,
    dataModel: {
      primary: "Account → Order",
      hierarchy: ["Account", "Order / Invoice / Delivery", "Estimate (since Oct 2024)", "—"],
      description: "Order-centric. Every SRS transaction auto-appears. But no Job, no Project, no persistent address record connecting it all."
    },
    lifecycle: {
      steps: [
        { label: "Estimate Created", auto: false, desc: "Estimator tool — measurement-driven, clean UI. Since Oct 2024." },
        { label: "Proposal Sent", auto: false, desc: "Customer-facing proposals with branding. One-click to order." },
        { label: "Order Placed", auto: true, desc: "Auto-appears — online, phone, or branch walk-in. All captured." },
        { label: "Delivery Tracked", auto: true, desc: "GPS tracking, delivery confirmation, site photos — all automatic." },
        { label: "Invoice Visible", auto: true, desc: "Actual invoiced amounts visible. The REAL cost data exists here." },
        { label: "No Job Record", auto: false, desc: "Transactions are standalone. No project wrapper. No lifecycle view." },
      ],
      autoCount: 3,
      manualCount: 3,
    },
    uxPatterns: [
      { pattern: "Order List View", desc: "Transactions listed chronologically. Clean and functional. But it's a receipt drawer — not a project management tool." },
      { pattern: "Estimator (New)", desc: "Measurement-driven estimate builder. Best-in-class for speed: measurement → material list → proposal → order in minutes." },
      { pattern: "Auto-Population", desc: "THE differentiator: every SRS transaction appears automatically, even walk-in branch orders. No data entry required for order/delivery/invoice." },
      { pattern: "No CRM Layer", desc: "No pipeline, no lead tracking, no production scheduling, no crew management. Pure commerce + logistics." },
      { pattern: "Single Distributor", desc: "SRS-only. If the contractor also buys from ABC or QXO, those transactions are invisible. No unified material cost view." },
    ],
    strengths: ["All transactions auto-populate", "Actual invoice data visible", "Free for SRS customers", "Clean estimator UX", "Branch + digital unified"],
    gaps: ["No job/project entity", "No lifecycle view", "No margin analysis dashboard", "SRS-only (no multi-distributor)", "No CRM features whatsoever"],
    pricing: "Free for SRS customers",
    marginTracking: "Raw data exists (invoices visible) but no job-level margin calculation",
    supplierIntegration: "Native (SRS IS the supplier) — but SRS-only",
  },
];

const AutoManualBar = ({ auto, manual }) => {
  const total = auto + manual;
  const autoPct = (auto / total) * 100;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6B7280", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
        <span>Auto-populated: {auto}/{total}</span>
        <span>Manual: {manual}/{total}</span>
      </div>
      <div style={{ height: 6, background: "#E5E7EB", borderRadius: 3, overflow: "hidden", display: "flex" }}>
        <div style={{ width: `${autoPct}%`, background: "#10B981", borderRadius: "3px 0 0 3px", transition: "width 0.4s ease" }} />
        <div style={{ width: `${100 - autoPct}%`, background: "#F59E0B", borderRadius: "0 3px 3px 0", transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
};

const LifecycleStep = ({ step, index, color }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
    <div style={{
      minWidth: 22, height: 22, borderRadius: "50%",
      background: step.auto ? "#10B981" : "#F59E0B",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, color: "#fff", fontWeight: 700, marginTop: 1,
      fontFamily: "'DM Mono', monospace"
    }}>
      {index + 1}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>
        {step.label}
        <span style={{
          marginLeft: 6, fontSize: 9, padding: "1px 6px", borderRadius: 3,
          background: step.auto ? "#D1FAE5" : "#FEF3C7",
          color: step.auto ? "#065F46" : "#92400E",
          fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em"
        }}>
          {step.auto ? "Auto" : "Manual"}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</div>
    </div>
  </div>
);

const PlatformCard = ({ platform, isExpanded, onToggle }) => {
  const [activeTab, setActiveTab] = useState("model");
  const tabs = [
    { id: "model", label: "Data Model" },
    { id: "lifecycle", label: "Lifecycle" },
    { id: "ux", label: "UX Patterns" },
    { id: "gaps", label: "Strengths & Gaps" },
  ];

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      border: platform.isTarget ? `2px solid ${platform.color}` : "1px solid #E5E7EB",
      overflow: "hidden",
      boxShadow: platform.isTarget ? `0 0 0 3px ${platform.color}15, 0 4px 24px rgba(0,0,0,0.06)` : "0 1px 8px rgba(0,0,0,0.04)",
      transition: "all 0.2s ease",
    }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          padding: "16px 20px",
          background: platform.isTarget ? platform.color : "#FAFAFA",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: isExpanded ? `1px solid ${platform.isTarget ? platform.color : "#E5E7EB"}` : "none",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {platform.isTarget && (
              <span style={{
                fontSize: 9, padding: "2px 8px", borderRadius: 4,
                background: "rgba(255,255,255,0.25)", color: "#fff",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                fontFamily: "'DM Mono', monospace"
              }}>TARGET</span>
            )}
            <span style={{
              fontSize: 18, fontWeight: 700,
              color: platform.isTarget ? "#fff" : "#111827",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em"
            }}>
              {platform.name}
            </span>
          </div>
          <div style={{
            fontSize: 12, marginTop: 4,
            color: platform.isTarget ? "rgba(255,255,255,0.8)" : "#6B7280",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {platform.tagline}
          </div>
        </div>
        <div style={{
          fontSize: 11, padding: "4px 10px", borderRadius: 6,
          background: platform.isTarget ? "rgba(255,255,255,0.2)" : platform.accent,
          color: platform.isTarget ? "#fff" : platform.color,
          fontWeight: 600, fontFamily: "'DM Mono', monospace",
          whiteSpace: "nowrap"
        }}>
          {platform.pricing.split("—")[0].split(";")[0].trim()}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div>
          {/* Tabs */}
          <div style={{
            display: "flex", borderBottom: "1px solid #E5E7EB",
            padding: "0 12px", background: "#FAFAFA",
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 14px", fontSize: 12, fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? platform.color : "#6B7280",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: activeTab === tab.id ? `2px solid ${platform.color}` : "2px solid transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 20 }}>
            {/* Data Model Tab */}
            {activeTab === "model" && (
              <div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 12
                }}>
                  <span style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: 4,
                    background: platform.accent, color: platform.color,
                    fontWeight: 700, fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase", letterSpacing: "0.05em"
                  }}>PRIMARY ENTITY</span>
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: "#111827",
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}>{platform.dataModel.primary}</span>
                </div>

                {/* Hierarchy visualization */}
                <div style={{
                  background: "#F9FAFB", borderRadius: 8, padding: 16, marginBottom: 14,
                  border: "1px solid #F3F4F6"
                }}>
                  {platform.dataModel.hierarchy.map((level, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: i < platform.dataModel.hierarchy.length - 1 ? 6 : 0 }}>
                      <div style={{
                        width: i * 20, height: 1, background: i > 0 ? "#D1D5DB" : "transparent", marginRight: i > 0 ? 8 : 0,
                      }} />
                      <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        {i > 0 && <span style={{ color: "#D1D5DB", fontSize: 10 }}>└</span>}
                        <span style={{
                          fontSize: 12, fontWeight: i === 0 ? 700 : 500,
                          color: i === 0 ? platform.color : "#374151",
                          fontFamily: "'DM Mono', monospace",
                          padding: "2px 8px", borderRadius: 4,
                          background: i === 0 ? `${platform.color}10` : "transparent",
                        }}>{level}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{
                  fontSize: 12, color: "#4B5563", lineHeight: 1.6,
                  fontFamily: "'DM Sans', sans-serif", margin: 0,
                }}>
                  {platform.dataModel.description}
                </p>

                {/* Quick stats row */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: 10, marginTop: 14
                }}>
                  <div style={{
                    padding: "10px 12px", background: "#F9FAFB", borderRadius: 8,
                    border: "1px solid #F3F4F6"
                  }}>
                    <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>Margin Tracking</div>
                    <div style={{ fontSize: 11, color: "#374151", fontFamily: "'DM Sans', sans-serif", marginTop: 4, lineHeight: 1.4 }}>{platform.marginTracking}</div>
                  </div>
                  <div style={{
                    padding: "10px 12px", background: "#F9FAFB", borderRadius: 8,
                    border: "1px solid #F3F4F6"
                  }}>
                    <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>Supplier Link</div>
                    <div style={{ fontSize: 11, color: "#374151", fontFamily: "'DM Sans', sans-serif", marginTop: 4, lineHeight: 1.4 }}>{platform.supplierIntegration}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Lifecycle Tab */}
            {activeTab === "lifecycle" && (
              <div>
                <AutoManualBar auto={platform.lifecycle.autoCount} manual={platform.lifecycle.manualCount} />
                <div style={{ marginTop: 16 }}>
                  {platform.lifecycle.steps.map((step, i) => (
                    <LifecycleStep key={i} step={step} index={i} color={platform.color} />
                  ))}
                </div>
              </div>
            )}

            {/* UX Patterns Tab */}
            {activeTab === "ux" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {platform.uxPatterns.map((p, i) => (
                  <div key={i} style={{
                    padding: 14, background: "#F9FAFB", borderRadius: 8,
                    borderLeft: `3px solid ${platform.color}`,
                  }}>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: "#111827",
                      fontFamily: "'Space Grotesk', sans-serif",
                      marginBottom: 4
                    }}>{p.pattern}</div>
                    <div style={{
                      fontSize: 12, color: "#4B5563", lineHeight: 1.5,
                      fontFamily: "'DM Sans', sans-serif"
                    }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Strengths & Gaps Tab */}
            {activeTab === "gaps" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: "#065F46",
                    fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
                    letterSpacing: "0.05em", marginBottom: 10
                  }}>Strengths</div>
                  {platform.strengths.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 8,
                      fontSize: 12, color: "#374151", fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.4
                    }}>
                      <span style={{ color: "#10B981", fontSize: 14, lineHeight: 1 }}>+</span>
                      {s}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: "#92400E",
                    fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
                    letterSpacing: "0.05em", marginBottom: 10
                  }}>Gaps / Limitations</div>
                  {platform.gaps.map((g, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 8,
                      fontSize: 12, color: "#374151", fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.4
                    }}>
                      <span style={{ color: "#F59E0B", fontSize: 14, lineHeight: 1 }}>−</span>
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function UXTeardown() {
  const [expandedIds, setExpandedIds] = useState(new Set(["jobs"]));
  const [comparisonView, setComparisonView] = useState(false);

  const toggle = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(platforms.map(p => p.id)));
  const collapseAll = () => setExpandedIds(new Set());

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8F9FB",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "#0A0F1E",
        padding: "32px 28px 28px",
        borderBottom: "1px solid #1E293B",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 8
          }}>
            <span style={{
              fontSize: 10, padding: "3px 8px", borderRadius: 4,
              background: "rgba(0,85,255,0.2)", color: "#60A5FA",
              fontWeight: 700, fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase", letterSpacing: "0.1em"
            }}>INTERNAL</span>
            <span style={{
              fontSize: 10, color: "#64748B",
              fontFamily: "'DM Mono', monospace",
            }}>QXO Ecom 2.0 · Jobs V1 · March 2026</span>
          </div>
          <h1 style={{
            fontSize: 26, fontWeight: 700, color: "#F1F5F9",
            fontFamily: "'Space Grotesk', sans-serif",
            margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1.2
          }}>
            UX Architecture Teardown
          </h1>
          <p style={{
            fontSize: 14, color: "#94A3B8", margin: 0,
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5,
            maxWidth: 600
          }}>
            Side-by-side comparison of how contractor CRMs structure job entities, lifecycle flows, and margin tracking — with QXO Jobs V1 as the design target.
          </p>

          {/* Legend */}
          <div style={{
            display: "flex", gap: 16, marginTop: 16,
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'DM Mono', monospace" }}>Auto-populated</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
              <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'DM Mono', monospace" }}>Manual entry</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 14, height: 8, borderRadius: 2, border: "2px solid #0055FF" }} />
              <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'DM Mono', monospace" }}>Design target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        maxWidth: 800, margin: "0 auto", padding: "12px 28px",
        display: "flex", justifyContent: "flex-end", gap: 8
      }}>
        <button onClick={expandAll} style={{
          fontSize: 11, padding: "5px 12px", borderRadius: 6,
          background: "#fff", border: "1px solid #E5E7EB", cursor: "pointer",
          color: "#6B7280", fontFamily: "'DM Sans', sans-serif", fontWeight: 500
        }}>Expand All</button>
        <button onClick={collapseAll} style={{
          fontSize: 11, padding: "5px 12px", borderRadius: 6,
          background: "#fff", border: "1px solid #E5E7EB", cursor: "pointer",
          color: "#6B7280", fontFamily: "'DM Sans', sans-serif", fontWeight: 500
        }}>Collapse All</button>
      </div>

      {/* Platform Cards */}
      <div style={{
        maxWidth: 800, margin: "0 auto", padding: "0 28px 40px",
        display: "flex", flexDirection: "column", gap: 14
      }}>
        {platforms.map(p => (
          <PlatformCard
            key={p.id}
            platform={p}
            isExpanded={expandedIds.has(p.id)}
            onToggle={() => toggle(p.id)}
          />
        ))}

        {/* Summary callout */}
        <div style={{
          background: "#0A0F1E", borderRadius: 12, padding: 24, marginTop: 8,
          border: "1px solid #1E293B",
        }}>
          <div style={{
            fontSize: 14, fontWeight: 700, color: "#F1F5F9",
            fontFamily: "'Space Grotesk', sans-serif", marginBottom: 10
          }}>The Gap in One Sentence</div>
          <p style={{
            fontSize: 13, color: "#CBD5E1", lineHeight: 1.7, margin: 0,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Every CRM requires contractors to <span style={{ color: "#F59E0B", fontWeight: 600 }}>create the job first</span>, then manually connect it to materials procurement.
            Every distributor portal <span style={{ color: "#10B981", fontWeight: 600 }}>auto-populates transaction data</span>, but organizes it as a receipt drawer with no project wrapper.
            QXO Jobs sits at the intersection: <span style={{ color: "#60A5FA", fontWeight: 600 }}>auto-created project records from supply chain data</span> — the job creates itself the moment the contractor starts working.
          </p>
        </div>
      </div>
    </div>
  );
}
