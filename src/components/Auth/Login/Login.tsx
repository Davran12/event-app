"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import styles from "./styles.module.scss"

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Заполните все поля")
      return
    }

    router.push("/")
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Вход</h2>

        {error && <span>{error}</span>}

        <input
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Войти</button>

        <p className={styles.link} onClick={() => router.push("/register")}>
          Нет аккаунта? <a href="">Регистрация</a>
        </p>
      </form>
    </div>
  )
}

export default Login
