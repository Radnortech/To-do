import { Outlet, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedLayout() {
  const session = supabase.auth.session()

  if (!session) {
    return <Navigate to="/login" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      <Outlet />
    </div>
  )
}
