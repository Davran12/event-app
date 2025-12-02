"use client"

import {useState} from "react"
import styles from "./styles.module.scss"

interface Props {
  formData: Record<string, string>
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onSwitch: (mode: "register" | "login" | "reset" | "confirm") => void
}

export default function Login({formData, setFormData, onSwitch}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fade, setFade] = useState<"in" | "out">("in")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({...errors, [e.target.name]: ""})
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    ;["Email", "Пароль"].forEach((field) => {
      const val = formData[field]?.trim()
      if (!val) newErrors[field] = "Заполните это поле"
      if (field === "Email" && val && !val.includes("@gmail.com"))
        newErrors[field] = "Почта должна содержать @gmail.com"
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) alert("Авторизация успешна!")
  }

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${
          fade === "in" ? styles.fadeIn : styles.fadeOut
        }`}
      >
        <h2>Авторизация</h2>
        <div className={styles.inputWrapper}>
          <input
            name="Email"
            placeholder="example@gmail.com"
            value={formData["Email"] || ""}
            onChange={handleChange}
          />
          {errors["Email"] && (
            <span className={styles.error}>{errors["Email"]}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            name="Пароль"
            placeholder="Пароль"
            value={formData["Пароль"] || ""}
            onChange={handleChange}
          />
          {errors["Пароль"] && (
            <span className={styles.error}>{errors["Пароль"]}</span>
          )}
        </div>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Войти
        </button>
        <p className={styles.forgot} onClick={() => onSwitch("reset")}>
          Забыл пароль?
        </p>
        <p className={styles.switch}>
          Нет аккаунта?{" "}
          <span
            className={styles.switchBtn}
            onClick={() => onSwitch("register")}
          >
            зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  )
}
