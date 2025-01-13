import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../components'

export const Route = createFileRoute('/Dashboard')({
  component: () => <Dashboard />
})