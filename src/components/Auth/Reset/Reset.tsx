"use client"

import {useState} from "react"
import styles from "./styles.module.scss"

interface Props {
  formData: Record<string, string>
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onSwitch: (mode: "register" | "login" | "reset" | "confirm") => void
}

export default function Reset({formData, setFormData, onSwitch}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fade, setFade] = useState<"in" | "out">("in")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({...errors, [e.target.name]: ""})
  }

  const handleSubmit = () => {
    const val = formData["Email"]?.trim()
    if (!val) {
      setErrors({Email: "Заполните это поле"})
      return
    }
    if (!val.includes("@gmail.com")) {
      setErrors({Email: "Почта должна содержать @gmail.com"})
      return
    }
    setFade("out")
    onSwitch("confirm")
    setFade("in")
  }

  const goBack = () => {
    setFade("out")
    onSwitch("login")
    setFade("in")
  }

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${
          fade === "in" ? styles.fadeIn : styles.fadeOut
        }`}
      >
        <h2>Восстановление пароля</h2>
        <button className={styles.backBtn} onClick={goBack}>
          ← Назад
        </button>
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
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Отправить код
        </button>
      </div>
    </div>
  )
}
