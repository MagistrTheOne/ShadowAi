"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Home() {
  const { data: session } = authClient.useSession()

  // Управляем инпутами через объект, чтобы не плодить useState
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const setField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const alertError = () => window.alert("Something went wrong")
  const alertSuccess = () => window.alert("Success!")

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email: form.email,
        name: form.name,
        password: form.password,
      },
      {
        onError: alertError,
        onSuccess: alertSuccess,
      }
    )
  }

  const onLogin = () => {
    authClient.signIn.email(
      {
        email: form.email,
        password: form.password,
      },
      {
        onError: alertError,
        onSuccess: alertSuccess,
      }
    )
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10 p-4">
      <div className="flex flex-col gap-y-4">
        <Input placeholder="name" value={form.name} onChange={setField("name")} />
        <Input placeholder="email" value={form.email} onChange={setField("email")} />
        <Input placeholder="password" type="password" value={form.password} onChange={setField("password")} />
        <Button onClick={onSubmit}>Create Account</Button>
      </div>
      <div className="flex flex-col gap-y-4">
        <Input placeholder="email" value={form.email} onChange={setField("email")} />
        <Input placeholder="password" type="password" value={form.password} onChange={setField("password")} />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  )
}
