function LeadStatusBadge({ status }: { status: string }) {
  const color =
    status === 'NEW'
      ? 'bg-blue-100 text-blue-700'
      : status === 'CONTACTED'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-green-100 text-green-700'

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${color}`}
    >
      {status}
    </span>
  )
}
