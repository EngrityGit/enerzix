export const privacyData = {
  version: "1.0.4",
  lastUpdated: "October 24, 2023",
  jurisdiction: "Canada (PIPEDA Compliant)",
  company: "Enerzix (Owned & Operated by Engrity Group Inc.)",
  
  sections: [
    {
      id: "intro",
      title: "1. Data Protocol Overview",
      content: `This Privacy Policy outlines the mandatory protocols for the collection, use, and disclosure of personal information by Enerzix ("we", "us", "our"). We operate in strict accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial legislation in Alberta, British Columbia, Ontario, and Quebec.`
    },
    {
      id: "collection",
      title: "2. Information Architecture (What We Collect)",
      content: `We collect data necessary to maintain glacial-standard service:`,
      list: [
        "Identity Data: Full name and business credentials for wholesale partners.",
        "Logistics Data: Precise Canadian shipping coordinates and billing addresses.",
        "Transaction Data: Encrypted payment tokens (we do not store raw credit card digits).",
        "Technical Data: IP addresses, browser types, and session duration via our Cookie Protocol."
      ]
    },
    {
      id: "usage",
      title: "3. Operational Usage",
      content: `Your data is used exclusively for the following system operations:`,
      list: [
        "Fulfillment: Processing 500ml vessel orders and logistics coordination.",
        "Traceability: Maintaining CFIA-required batch records and distribution logs for health safety.",
        "Wholesale Verification: Assessing credit-worthiness and business legitimacy for $2,000+ CAD orders.",
        "Communication: Dispatching automated order status and logistics updates."
      ]
    },
    {
      id: "sharing",
      title: "4. Third-Party Data Transfer",
      content: `We do not sell Canadian consumer data. We only share data with authorized service providers essential for our supply chain:`,
      list: [
        "Logistics Partners: Canadian courier services for national delivery.",
        "Payment Processors: PCI-compliant gateways for secure CAD transactions.",
        "Regulatory Bodies: Health Canada or CFIA if required for safety audits."
      ]
    },
    {
      id: "security",
      title: "5. Data Residency & Security",
      content: `Whenever possible, Enerzix prioritizes data residency within Canadian borders. We employ AES-256 encryption and periodic system audits to prevent unauthorized access or glacial data leaks.`
    }
  ]
};