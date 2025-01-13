import { createLazyFileRoute } from '@tanstack/react-router'
import { Lazy } from '../../components'

export const Route = createLazyFileRoute('/lazy')({
  component: Lazy
})