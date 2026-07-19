/**
 * Mock dashboard data — no backend.
 */

export const mockStats = [
  {
    id: "docs",
    label: "Documents",
    value: "128",
    delta: "+12 this week",
    tone: "blue",
  },
  {
    id: "verified",
    label: "Verified",
    value: "96",
    delta: "75% success rate",
    tone: "emerald",
  },
  {
    id: "pending",
    label: "Pending",
    value: "7",
    delta: "2 awaiting confirm",
    tone: "purple",
  },
  {
    id: "onchain",
    label: "On-chain",
    value: "84",
    delta: "Anchored hashes",
    tone: "cyan",
  },
];

export const mockQuickActions = [
  {
    id: "upload",
    title: "Upload document",
    description: "Hash and prepare for anchoring",
    to: "/upload",
    tone: "blue",
  },
  {
    id: "verify",
    title: "Verify file",
    description: "Check authenticity on-chain",
    to: "/verify",
    tone: "purple",
  },
  {
    id: "history",
    title: "View history",
    description: "Browse past verifications",
    to: "/history",
    tone: "cyan",
  },
  {
    id: "profile",
    title: "Account",
    description: "Manage your profile",
    to: "/profile",
    tone: "emerald",
  },
];

export const mockUploads = [
  {
    id: "u1",
    name: "Q2-Financial-Report.pdf",
    size: "2.4 MB",
    hash: "0x7f3a…c91e",
    status: "Anchored",
    date: "2 hours ago",
  },
  {
    id: "u2",
    name: "Employment-Contract.docx",
    size: "186 KB",
    hash: "0xb2e1…4a08",
    status: "Pending",
    date: "Yesterday",
  },
  {
    id: "u3",
    name: "Patent-Filing-2026.pdf",
    size: "4.1 MB",
    hash: "0x91cd…e2f7",
    status: "Anchored",
    date: "Mar 12",
  },
  {
    id: "u4",
    name: "NDA-Acme-Corp.pdf",
    size: "312 KB",
    hash: "0x44aa…9012",
    status: "Verified",
    date: "Mar 10",
  },
];

export const mockVerifications = [
  {
    id: "v1",
    name: "Invoice-8841.pdf",
    result: "Match",
    network: "Sepolia",
    date: "Today, 09:14",
  },
  {
    id: "v2",
    name: "Diploma-Scan.pdf",
    result: "Match",
    network: "Sepolia",
    date: "Yesterday",
  },
  {
    id: "v3",
    name: "Altered-Draft.pdf",
    result: "Mismatch",
    network: "Sepolia",
    date: "Mar 14",
  },
  {
    id: "v4",
    name: "Board-Minutes.pdf",
    result: "Match",
    network: "Mainnet",
    date: "Mar 11",
  },
];

export const mockActivity = [
  {
    id: "a1",
    title: "Document anchored",
    detail: "Q2-Financial-Report.pdf registered on Sepolia",
    time: "2h ago",
    type: "anchor",
  },
  {
    id: "a2",
    title: "Verification passed",
    detail: "Invoice-8841.pdf matched on-chain hash",
    time: "5h ago",
    type: "verify",
  },
  {
    id: "a3",
    title: "Upload received",
    detail: "Employment-Contract.docx queued for hashing",
    time: "Yesterday",
    type: "upload",
  },
  {
    id: "a4",
    title: "Mismatch detected",
    detail: "Altered-Draft.pdf failed integrity check",
    time: "Mar 14",
    type: "alert",
  },
  {
    id: "a5",
    title: "Profile updated",
    detail: "Display name and email preferences saved",
    time: "Mar 12",
    type: "profile",
  },
];

export const mockStorage = {
  usedGb: 3.8,
  totalGb: 10,
  breakdown: [
    { label: "PDFs", value: 52, color: "#3b82f6" },
    { label: "Images", value: 28, color: "#8b5cf6" },
    { label: "Office", value: 14, color: "#22d3ee" },
    { label: "Other", value: 6, color: "#10b981" },
  ],
};

export const mockTransactions = [
  {
    id: "tx1",
    hash: "0x8c21a9…f3e4",
    action: "RegisterHash",
    status: "Confirmed",
    block: "5,842,193",
    gas: "0.0012 ETH",
    time: "2h ago",
  },
  {
    id: "tx2",
    hash: "0x1bd044…9aa1",
    action: "RegisterHash",
    status: "Pending",
    block: "—",
    gas: "0.0011 ETH",
    time: "Yesterday",
  },
  {
    id: "tx3",
    hash: "0xfe9012…77c0",
    action: "RegisterHash",
    status: "Confirmed",
    block: "5,839,001",
    gas: "0.0014 ETH",
    time: "Mar 12",
  },
  {
    id: "tx4",
    hash: "0xaa44c1…220d",
    action: "RegisterHash",
    status: "Confirmed",
    block: "5,830,772",
    gas: "0.0009 ETH",
    time: "Mar 10",
  },
];

export const mockNotifications = [
  { id: "n1", text: "Hash confirmation mined on Sepolia", time: "1h" },
  { id: "n2", text: "Storage at 38% capacity", time: "1d" },
  { id: "n3", text: "New verification request received", time: "2d" },
];
