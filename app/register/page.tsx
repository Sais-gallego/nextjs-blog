"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "../components/NotificationContext"
import FormField from "../components/FormField"

export default function RegisterPage() {
  const [usernameError, setUsernameError] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")
  const [generalError, setGeneralError] = useState("")
  const { showNotification } = useNotification()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsernameError("")
    setPasswordConfirmError("")
    setGeneralError("")

    const formData = new FormData(e.currentTarget)
    const username = ((formData.get("username") as string) || "").trim()
    const name = ((formData.get("name") as string) || "").trim()
    const password = (formData.get("password") as string) || ""
    const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

    let hasError = false
    if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long")
      hasError = true
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("Passwords do not match")
      hasError = true
    }
    if (hasError) return

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setGeneralError(data.error || "Registration failed")
      return
    }

    showNotification("registered successfully")
    router.push("/login")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormField label="Username" name="username" required />
          {usernameError && (
            <p data-testid="username-error" className="text-red-600 text-sm mt-1">
              {usernameError}
            </p>
          )}
        </div>
        <FormField label="Name" name="name" required />
        <FormField label="Password" name="password" type="password" required />
        <div>
          <FormField
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            required
          />
          {passwordConfirmError && (
            <p
              data-testid="passwordConfirm-error"
              className="text-red-600 text-sm mt-1"
            >
              {passwordConfirmError}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
        {generalError && <p className="text-red-600">{generalError}</p>}
      </form>
    </div>
  )
}
