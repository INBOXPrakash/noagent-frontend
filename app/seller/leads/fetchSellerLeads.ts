.select(`
  id,
  buyer_name,
  buyer_phone,
  buyer_email,
  status,
  created_at,
  properties (
    id,
    title
  )
`)
