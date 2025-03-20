import { supabase } from '../lib/supabase'

export default function Header() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    }
    window.location.href = '/login'
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-surface-900">Todo App</h1>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
