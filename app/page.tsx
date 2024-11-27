import { Suspense } from 'react'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Marketplace Scraper</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
      <div className="mt-8 flex gap-4">
        <LoginForm />
        <RegisterForm />
      </div>
    </main>
  )
}

