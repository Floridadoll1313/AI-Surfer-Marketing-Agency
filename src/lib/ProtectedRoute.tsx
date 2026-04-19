import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('membership_token')

  if (!token) {
    return <Navigate to="/pricing" replace />
  }

  return children
}
