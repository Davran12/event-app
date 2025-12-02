"use client"

import {useState} from "react"
import styles from "./styles.module.scss"

interface Props {
  formData: Record<string, string>
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onSwitch: (mode: "register" | "login" | "reset" | "confirm") => void
}

export default function Confirm({formData, setFormData, onSwitch}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fade, setFade] = useState<"in" | "out">("in")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({...errors, [e.target.name]: ""})
  }

  const handleSubmit = () => {
    if (!formData["Код"]?.trim()) {
      setErrors({Код: "Введите код"})
      return
    }
    alert("Код подтверждён!")
  }

  const goBack = () => {
    setFade("out")
    onSwitch("reset")
    setFade("in")
  }

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${
          fade === "in" ? styles.fadeIn : styles.fadeOut
        }`}
      >
        <h2>Введите код</h2>
        <button className={styles.backBtn} onClick={goBack}>
          ← Назад
        </button>
        <div className={styles.inputWrapper}>
          <input
            name="Код"
            placeholder="Код"
            value={formData["Код"] || ""}
            onChange={handleChange}
          />
          {errors["Код"] && (
            <span className={styles.error}>{errors["Код"]}</span>
          )}
        </div>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Подтвердить код
        </button>
      </div>
    </div>
  )
}
