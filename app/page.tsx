'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiHome, FiUpload, FiEdit3, FiHistory, FiChevronRight, FiDownload, FiRefreshCw } from 'react-icons/fi'
import { FiTrendingUp } from 'react-icons/fi'

interface StatCard {
  label: string
  value: string | number
  unit?: string
}

interface Policy {
  id: string
  name: string
  status: 'Draft' | 'Approved' | 'Review Needed'
  date: string
  complianceScore: number
}

const POLICY_COORDINATION_MANAGER = '695c4707457887dd859fb84e'
const POLICY_DRAFTING_AGENT = '695c46f5a45696ac999e3140'
const COMPLIANCE_ANALYZER_AGENT = '695c4700c2dad05ba69adc65'
const KNOWLEDGE_BASE_RAG_ID = '695c46eebb92cd00acf846c4'

const recentPolicies: Policy[] = [
  { id: '1', name: 'Remote Work Policy', status: 'Draft', date: '2024-01-15', complianceScore: 94 },
  { id: '2', name: 'Leave Management Policy', status: 'Approved', date: '2024-01-10', complianceScore: 98 },
  { id: '3', name: 'Code of Conduct', status: 'Approved', date: '2024-01-05', complianceScore: 96 },
]

const samplePolicies: Policy[] = [
  { id: '1', name: 'Remote Work Policy', status: 'Draft', date: '2024-01-15', complianceScore: 94 },
  { id: '2', name: 'Leave Management Policy', status: 'Approved', date: '2024-01-10', complianceScore: 98 },
  { id: '3', name: 'Code of Conduct', status: 'Approved', date: '2024-01-05', complianceScore: 96 },
  { id: '4', name: 'Safety Policy', status: 'Review Needed', date: '2024-01-01', complianceScore: 87 },
]

function Sidebar({ currentPage, setCurrentPage, mobileOpen, setMobileOpen }: {
  currentPage: string
  setCurrentPage: (page: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'upload', label: 'Upload Guidelines', icon: FiUpload },
    { id: 'create', label: 'Create Policy', icon: FiEdit3 },
    { id: 'history', label: 'Policy History', icon: FiHistory },
  ]

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1a2332] text-white transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:z-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">Policy Manager</h1>
            <p className="text-xs text-gray-400 mt-1">Compliance & Drafting System</p>
          </div>

          <nav className="flex-1 p-4">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-[#0891b2] text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">Agent IDs Configured:</p>
            <p className="text-xs text-gray-400 mt-2">• Policy Coordination Manager</p>
            <p className="text-xs text-gray-400">• Policy Drafting Agent</p>
            <p className="text-xs text-gray-400">• Compliance Analyzer</p>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}

function StatCard({ label, value, unit }: StatCard) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-3xl font-bold text-[#1a2332]">{value}</p>
        {unit && <p className="text-sm text-gray-500">{unit}</p>}
      </div>
    </div>
  )
}

function ComplianceStatusBadge({ status }: { status: 'Draft' | 'Approved' | 'Review Needed' }) {
  const colors: Record<string, { bg: string; text: string }> = {
    'Draft': { bg: 'bg-gray-100', text: 'text-gray-700' },
    'Approved': { bg: 'bg-green-100', text: 'text-green-700' },
    'Review Needed': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  }

  const style = colors[status] || colors['Draft']

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {status}
    </span>
  )
}

function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1a2332] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Policies" value={12} />
        <StatCard label="Pending Reviews" value={3} />
        <StatCard label="Compliance Score" value={94} unit="%" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#1a2332] mb-4">Recent Policies</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Policy Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Compliance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPolicies.map((policy) => (
                <tr key={policy.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{policy.name}</td>
                  <td className="py-4 px-4">
                    <ComplianceStatusBadge status={policy.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{policy.date}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-green-600">{policy.complianceScore}%</td>
                  <td className="py-4 px-4">
                    <button className="text-[#0891b2] hover:text-[#0891b2] text-sm font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-[#1a2332] text-white rounded-lg py-4 px-6 font-semibold hover:bg-[#0f1419] transition-colors text-lg">
          Create New Policy
        </button>
        <button className="bg-[#0891b2] text-white rounded-lg py-4 px-6 font-semibold hover:bg-[#0a7a9b] transition-colors text-lg">
          Upload Guidelines
        </button>
      </div>
    </div>
  )
}

function UploadGuidelinesPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; date: string; status: string }>>([])
  const [indexing, setIndexing] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(f => f.type === 'application/pdf' || f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    setFiles(prev => [...prev, ...validFiles])
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)

    // Simulate upload progress
    for (const file of files) {
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        date: new Date().toLocaleDateString(),
        status: 'Indexing...'
      }])
    }

    // Simulate indexing
    setIndexing(true)
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => ({ ...f, status: 'Complete' })))
      setIndexing(false)
    }, 3000)

    setFiles([])
    setUploading(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1a2332] mb-8">Upload Guidelines</h1>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center mb-8 cursor-pointer hover:border-[#0891b2] transition-colors"
      >
        <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900 mb-2">Drag and drop your guidelines here</p>
        <p className="text-sm text-gray-500 mb-6">or click to select files (PDF, DOCX)</p>
        <input
          type="file"
          multiple
          accept=".pdf,.docx"
          onChange={(e) => {
            const selectedFiles = Array.from(e.currentTarget.files || [])
            setFiles(prev => [...prev, ...selectedFiles])
          }}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="inline-block">
          <button
            type="button"
            className="bg-[#0891b2] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0a7a9b] transition-colors"
          >
            Choose Files
          </button>
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-[#1a2332] mb-4">Files to Upload ({files.length})</h3>
          <ul className="space-y-2 mb-4">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                  className="text-red-500 text-sm font-medium hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-[#1a2332] text-white py-2 rounded-lg font-semibold hover:bg-[#0f1419] transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-[#1a2332] mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    file.status === 'Complete'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {file.status}
                  </span>
                  <button className="text-red-500 text-sm hover:text-red-700">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CreatePolicyPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [policyType, setPolicyType] = useState('Leave')
  const [scope, setScope] = useState('company')
  const [requirements, setRequirements] = useState('')
  const [jurisdictions, setJurisdictions] = useState({ us: true, india: true })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const charCount = requirements.length
  const maxChars = 2000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!requirements.trim()) {
      setError('Please enter policy requirements')
      return
    }

    setLoading(true)
    setError('')

    try {
      const message = `Generate a ${policyType} policy for ${scope} scope with these requirements: ${requirements}. Analyze for compliance with ${
        jurisdictions.us && jurisdictions.india ? 'US and India' : jurisdictions.us ? 'US' : 'India'
      } labor laws.`

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: POLICY_COORDINATION_MANAGER,
          message: message
        })
      })

      const data = await response.json()

      if (data.success) {
        // Store the response and navigate
        sessionStorage.setItem('policyResponse', JSON.stringify({
          policyType,
          scope,
          requirements,
          jurisdictions,
          response: data.response
        }))
        setCurrentPage('results')
      } else {
        setError('Failed to generate policy. Please try again.')
      }
    } catch (err) {
      setError('Error generating policy. Please check your input and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1a2332] mb-8">Create Policy</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Policy Type</label>
            <select
              value={policyType}
              onChange={(e) => setPolicyType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891b2] focus:border-transparent outline-none"
            >
              <option>Leave</option>
              <option>Conduct</option>
              <option>Remote Work</option>
              <option>Safety</option>
              <option>Work Hours</option>
              <option>Data Security</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Scope</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="department"
                  checked={scope === 'department'}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Department</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="company"
                  checked={scope === 'company'}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Company-wide</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Policy Requirements</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value.slice(0, maxChars))}
              placeholder="Describe your policy requirements..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891b2] focus:border-transparent outline-none resize-none"
              rows={6}
            />
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-500">Maximum 2000 characters</p>
              <p className={`text-xs font-medium ${charCount > maxChars * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
                {charCount}/{maxChars}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Jurisdictions</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={jurisdictions.us}
                  onChange={(e) => setJurisdictions({ ...jurisdictions, us: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">United States</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={jurisdictions.india}
                  onChange={(e) => setJurisdictions({ ...jurisdictions, india: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">India</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2332] text-white py-3 rounded-lg font-semibold hover:bg-[#0f1419] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Generating policy with compliance analysis...
              </>
            ) : (
              'Generate Policy'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

function ResultsPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [policyData, setPolicyData] = useState<any>(null)
  const [expandedSections, setExpandedSections] = useState({ us: true, india: true, recommendations: true })

  // Load data from sessionStorage
  if (!policyData) {
    const stored = sessionStorage.getItem('policyResponse')
    if (stored) {
      setPolicyData(JSON.parse(stored))
    }
  }

  if (!policyData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No policy data available. Please create a policy first.</p>
        <button
          onClick={() => setCurrentPage('create')}
          className="mt-4 bg-[#0891b2] text-white px-6 py-2 rounded-lg font-semibold"
        >
          Create Policy
        </button>
      </div>
    )
  }

  const response = policyData.response

  // Parse response - handle both structured and text responses
  let policyContent = ''
  let complianceAnalysis: any = null

  if (typeof response === 'string') {
    policyContent = response
  } else if (response && typeof response === 'object') {
    policyContent = response.policy_draft || response.policy || response.content || JSON.stringify(response, null, 2)
    complianceAnalysis = response.compliance_analysis || response.analysis || response.findings || null
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([policyContent], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${policyData.policyType}_policy_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1a2332] mb-8">Policy Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Policy Document */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#1a2332] mb-6">{policyData.policyType} Policy</h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto border border-gray-200">
              <div className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {policyContent}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-[#0891b2] text-white py-2 rounded-lg font-semibold hover:bg-[#0a7a9b] transition-colors"
              >
                <FiDownload className="h-4 w-4" />
                Download PDF
              </button>
              <button
                onClick={() => setCurrentPage('create')}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                <FiRefreshCw className="h-4 w-4" />
                Regenerate
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Compliance Analysis */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#1a2332] mb-6">Compliance Analysis</h3>

            {/* US Findings Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSections({ ...expandedSections, us: !expandedSections.us })}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900">US Findings</span>
                <span className={`transform transition-transform ${expandedSections.us ? 'rotate-180' : ''}`}>
                  <FiChevronRight className="h-5 w-5 text-gray-600" />
                </span>
              </button>
              {expandedSections.us && (
                <div className="p-4 text-sm text-gray-700">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                    Compliant
                  </span>
                  <p>Your policy meets all US federal and state labor law requirements.</p>
                </div>
              )}
            </div>

            {/* India Findings Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSections({ ...expandedSections, india: !expandedSections.india })}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900">India Findings</span>
                <span className={`transform transition-transform ${expandedSections.india ? 'rotate-180' : ''}`}>
                  <FiChevronRight className="h-5 w-5 text-gray-600" />
                </span>
              </button>
              {expandedSections.india && (
                <div className="p-4 text-sm text-gray-700">
                  <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                    Review Needed
                  </span>
                  <p>Ensure compliance with Indian labor codes and state-specific regulations.</p>
                </div>
              )}
            </div>

            {/* Recommendations Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSections({ ...expandedSections, recommendations: !expandedSections.recommendations })}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900">Recommendations</span>
                <span className={`transform transition-transform ${expandedSections.recommendations ? 'rotate-180' : ''}`}>
                  <FiChevronRight className="h-5 w-5 text-gray-600" />
                </span>
              </button>
              {expandedSections.recommendations && (
                <div className="p-4">
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">Review policy with legal counsel</li>
                    <li className="text-sm text-gray-700">Implement feedback mechanisms</li>
                    <li className="text-sm text-gray-700">Schedule quarterly compliance reviews</li>
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentPage('history')}
              className="w-full bg-[#1a2332] text-white py-2 rounded-lg font-semibold hover:bg-[#0f1419] transition-colors mt-6"
            >
              Save to History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PolicyHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [policies] = useState(samplePolicies)

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || policy.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1a2332] mb-8">Policy History</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891b2] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891b2] focus:border-transparent outline-none"
            >
              <option>All</option>
              <option>Draft</option>
              <option>Approved</option>
              <option>Review Needed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Policy Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Compliance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{policy.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{policy.status}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{policy.date}</td>
                    <td className="py-4 px-4">
                      <ComplianceStatusBadge status={policy.status} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${policy.complianceScore}%`,
                              backgroundColor: policy.complianceScore >= 90 ? '#10b981' : policy.complianceScore >= 80 ? '#f59e0b' : '#ef4444'
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{policy.complianceScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <div className="flex gap-3">
                        <button className="text-[#0891b2] hover:text-[#0a7a9b] font-medium">View</button>
                        <button className="text-[#0891b2] hover:text-[#0a7a9b] font-medium">Download</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                    No policies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:justify-end shadow-sm">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'upload' && <UploadGuidelinesPage />}
          {currentPage === 'create' && <CreatePolicyPage setCurrentPage={setCurrentPage} />}
          {currentPage === 'results' && <ResultsPage setCurrentPage={setCurrentPage} />}
          {currentPage === 'history' && <PolicyHistoryPage />}
        </main>
      </div>
    </div>
  )
}
