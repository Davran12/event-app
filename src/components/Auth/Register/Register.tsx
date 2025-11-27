"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import styles from "./styles.module.scss"

const Register = () => {
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    group: "",
  })

  const [errors, setErrors] = useState<any>({})

  const validate = () => {
    const newErrors: any = {}

    if (form.fullName.trim().length < 3)
      newErrors.fullName = "Введите корректное ФИО"

    if (!/^\+996\d{9}$/.test(form.phone))
      newErrors.phone = "Введите корректный номер телефона"

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Некорректный формат почты"

    if (!form.group) newErrors.group = "Выберите группу"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    alert("Регистрация успешна!")
    router.push("/")
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Регистрация</h2>

        <input
          placeholder="ФИО"
          value={form.fullName}
          onChange={(e) => setForm({...form, fullName: e.target.value})}
        />
        {errors.fullName && <span>{errors.fullName}</span>}

        <input
          placeholder="+996XXXXXXXXX"
          value={form.phone}
          onChange={(e) => setForm({...form, phone: e.target.value})}
        />
        {errors.phone && <span>{errors.phone}</span>}

        <input
          type="email"
          placeholder="Почта"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        {errors.email && <span>{errors.email}</span>}

        <input
          placeholder="Группа"
          value={form.group}
          onChange={(e) => setForm({...form, group: e.target.value})}
        />
        {errors.group && <span>{errors.group}</span>}

        <button onClick={() => router.push("/")} type="submit">
          Зарегистрироваться
        </button>

        <p className={styles.link} onClick={() => router.push("/login")}>
          Уже есть аккаунт? <a href="">Войти</a>
        </p>
      </form>
    </div>
  )
}

export default Register
