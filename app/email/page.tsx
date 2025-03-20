"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function Email() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [typedCommand, setTypedCommand] = useState("")
  const [typedEmail, setTypedEmail] = useState("")
  const command = "$ contact --email"
  const email = "zzzjxk@gmail.com"
  const commandCursorRef = useRef<HTMLSpanElement>(null)
  const emailCursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Type command first
    let i = 0
    const typeCommandInterval = setInterval(() => {
      if (i < command.length) {
        setTypedCommand(command.substring(0, i + 1))
        i++
      } else {
        clearInterval(typeCommandInterval)

        // After command is typed, wait a bit then type email
        setTimeout(() => {
          let j = 0
          const typeEmailInterval = setInterval(() => {
            if (j < email.length) {
              setTypedEmail(email.substring(0, j + 1))
              j++
            } else {
              clearInterval(typeEmailInterval)

              // Start cursor blink after typing is complete
              if (emailCursorRef.current) {
                emailCursorRef.current.classList.add("blink")
              }
            }
          }, 40) // Very fast typing for email
        }, 500)
      }
    }, 60)

    return () => clearInterval(typeCommandInterval)
  }, [isVisible])

  return (
    <main className="min-h-screen bg-black text-white p-6 font-mono flex flex-col">
      <div className="max-w-2xl mx-auto w-full">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/")}
          className="mb-12 flex items-center hover:underline focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="uppercase text-xs tracking-widest">BACK</span>
        </motion.button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-black p-8"
            >
              <div className="flex items-center justify-center">
                <div className="text-left">
                  <div className="mb-4 text-xs text-green-500 uppercase tracking-widest relative">
                    {typedCommand}
                    <span
                      ref={commandCursorRef}
                      className={`h-4 w-2 bg-green-500 inline-block absolute ml-0.5 ${typedEmail ? "hidden" : ""}`}
                    ></span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl md:text-2xl font-bold tracking-wider text-white font-mono">
                      {typedEmail}
                    </span>
                    <span ref={emailCursorRef} className="h-6 w-2 bg-white inline-block ml-0.5"></span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: typedEmail.length === email.length ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-xs text-white/50 uppercase tracking-widest"
                  >
                    // FEEL FREE TO REACH OUT
                  </motion.div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent opacity-50 pointer-events-none"></div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

