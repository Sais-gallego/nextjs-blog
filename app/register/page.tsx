"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "../actions/users"
import { useNotification } from "../components/NotificationContext"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: "",
    success: false,
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("registered successfully")
      router.push("/login")
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit">Register</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}
