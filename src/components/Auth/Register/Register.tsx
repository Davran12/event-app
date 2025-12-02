"use client"

import {useState} from "react"
import styles from "./styles.module.scss"
import Login from "../Login/Login"
import Reset from "../Reset/Reset"
import Confirm from "../Confirm/Confirm"

export default function Register() {
  const [mode, setMode] = useState<"register" | "login" | "reset" | "confirm">(
    "register"
  )
  const [fade, setFade] = useState<"in" | "out">("in")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const switchMode = (newMode: typeof mode) => {
    setFade("out")
    setMode(newMode)
    setFade("in")
    setErrors({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({...errors, [e.target.name]: ""})
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    ;[
      "ФИО",
      "Номер телефона",
      "Группа / Направление",
      "Email",
      "Пароль",
    ].forEach((field) => {
      const val = formData[field]?.trim()
      if (!val) newErrors[field] = "Заполните это поле"
      if (field === "Email" && val && !val.includes("@gmail.com"))
        newErrors[field] = "Почта должна содержать @gmail.com"
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) alert("Регистрация успешна!")
  }

  if (mode === "login")
    return (
      <Login
        formData={formData}
        setFormData={setFormData}
        onSwitch={switchMode}
      />
    )
  if (mode === "reset")
    return (
      <Reset
        formData={formData}
        setFormData={setFormData}
        onSwitch={switchMode}
      />
    )
  if (mode === "confirm")
    return (
      <Confirm
        formData={formData}
        setFormData={setFormData}
        onSwitch={switchMode}
      />
    )

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${
          fade === "in" ? styles.fadeIn : styles.fadeOut
        }`}
      >
        <h2>Регистрация</h2>
        {[
          "ФИО",
          "Номер телефона",
          "Группа / Направление",
          "Email",
          "Пароль",
        ].map((field) => (
          <div key={field} className={styles.inputWrapper}>
            <input
              name={field}
              type={field === "Пароль" ? "password" : "text"}
              placeholder={
                field === "Email"
                  ? "example@gmail.com"
                  : field === "Номер телефона"
                  ? "+996123456789"
                  : field
              }
              value={formData[field] || ""}
              onChange={handleChange}
            />
            {errors[field] && (
              <span className={styles.error}>{errors[field]}</span>
            )}
          </div>
        ))}
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Зарегистрироваться
        </button>
        <p className={styles.switch}>
          Есть аккаунт?{" "}
          <span
            className={styles.switchBtn}
            onClick={() => switchMode("login")}
          >
            войти
          </span>
        </p>
      </div>
    </div>
  )
}
