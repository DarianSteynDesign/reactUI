import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '../components/SignUp/SignUp'

export const Route = createFileRoute('/SignUp')({
  component: () => <SignUp />
})  