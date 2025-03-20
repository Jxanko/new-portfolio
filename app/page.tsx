"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const router = useRouter()
  const controls = useAnimationControls()
  const [showMission, setShowMission] = useState(false)
  const [showBullets, setShowBullets] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  // Typing animation state
  const [missionText, setMissionText] = useState("")
  const [bullet1Text, setBullet1Text] = useState("")
  const [bullet2Text, setBullet2Text] = useState("")
  const [bullet3Text, setBullet3Text] = useState("")
  const [contentText, setContentText] = useState("")
  const [readMoreText, setReadMoreText] = useState("")

  // Text content
  const mission = "MY MISSION IS TO HELP PEOPLE:"
  const bullet1 = "> INCREASE HEALTH AND DISCIPLINE"
  const bullet2 = "> BUILD WITH AI"
  const bullet3 = "> ACHIEVE LONG-TERM GOALS"
  const content = "IN ORDER TO DO THIS, I AM CURRENTLY CREATING CONTENT ON SOCIAL MEDIA AND BUILDING A STEALTH APP."
  const readMore = "TO LEARN MORE ABOUT MY STORY AND WIN >"

  // Cursor refs
  const missionCursorRef = useRef<HTMLSpanElement>(null)
  const bullet1CursorRef = useRef<HTMLSpanElement>(null)
  const bullet2CursorRef = useRef<HTMLSpanElement>(null)
  const bullet3CursorRef = useRef<HTMLSpanElement>(null)
  const contentCursorRef = useRef<HTMLSpanElement>(null)
  const readMoreCursorRef = useRef<HTMLSpanElement>(null)

  // Type text function
  const typeText = (
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    cursorRef: React.RefObject<HTMLSpanElement>,
    onComplete?: () => void,
  ) => {
    let i = 0
    const speed = 30 // Faster typing speed

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
        if (cursorRef.current) {
          cursorRef.current.classList.add("blink")
        }
        if (onComplete) {
          onComplete()
        }
      }
    }, speed)

    return () => clearInterval(typeInterval)
  }

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } })
      setShowMission(true)

      // Start the typing sequence
      setTimeout(() => {
        typeText(mission, setMissionText, missionCursorRef, () => {
          setTimeout(() => {
            setShowBullets(true)
            typeText(bullet1, setBullet1Text, bullet1CursorRef, () => {
              setTimeout(() => {
                typeText(bullet2, setBullet2Text, bullet2CursorRef, () => {
                  setTimeout(() => {
                    typeText(bullet3, setBullet3Text, bullet3CursorRef, () => {
                      setTimeout(() => {
                        setShowContent(true)
                        typeText(content, setContentText, contentCursorRef, () => {
                          setTimeout(() => {
                            setShowReadMore(true)
                            typeText(readMore, setReadMoreText, readMoreCursorRef)
                            setTimeout(() => setShowFooter(true), 1000)
                          }, 500)
                        })
                      }, 300)
                    })
                  }, 300)
                })
              }, 300)
            })
          }, 300)
        })
      }, 500)
    }

    sequence()
  }, [controls])

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col justify-between font-mono">
      <div className="max-w-2xl mx-auto w-full pt-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={controls} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-mono tracking-tight relative inline-block text-white uppercase">
            JUAN&apos;KO
          </h1>
        </motion.div>

        <div className="space-y-8">
          {showMission && (
            <p className="uppercase tracking-wide text-sm relative">
              {missionText}
              <span ref={missionCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
            </p>
          )}

          {showBullets && (
            <ul className="space-y-2">
              <li className="uppercase tracking-wide text-sm relative">
                {bullet1Text}
                <span ref={bullet1CursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </li>
              <li className="uppercase tracking-wide text-sm relative">
                {bullet2Text}
                <span ref={bullet2CursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </li>
              <li className="uppercase tracking-wide text-sm relative">
                {bullet3Text}
                <span ref={bullet3CursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </li>
            </ul>
          )}

          {showContent && (
            <p className="uppercase tracking-wide text-sm relative">
              {contentText}
              <span ref={contentCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
            </p>
          )}

          {showReadMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pt-4"
            >
              <button
                onClick={() => router.push("/my-story")}
                className="uppercase focus:outline-none group inline-flex items-center tracking-wide text-sm relative"
              >
                {readMoreText}
                <span ref={readMoreCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {showFooter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center space-x-8 py-8"
        >
          <motion.a
            href="https://x.com/thejuankopriva"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </motion.a>

          <motion.button
            onClick={() => router.push("/email")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </main>
  )
}

