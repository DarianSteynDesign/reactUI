import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lazy')({
  component: () => <div>Hello /lazy!</div>
})