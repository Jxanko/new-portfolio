"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function MyStory() {
  const router = useRouter()
  const [storyText, setStoryText] = useState("")
  const [rizzGPTTitle, setRizzGPTTitle] = useState("")
  const [umaxTitle, setUmaxTitle] = useState("")
  const [calAITitle, setCalAITitle] = useState("")
  const [conclusionText, setConclusionText] = useState("")
  const [skillsTitle, setSkillsTitle] = useState("")

  const [showRizzGPT, setShowRizzGPT] = useState(false)
  const [showRizzGPTContent, setShowRizzGPTContent] = useState(false)
  const [showUmax, setShowUmax] = useState(false)
  const [showUmaxContent, setShowUmaxContent] = useState(false)
  const [showCalAI, setShowCalAI] = useState(false)
  const [showCalAIContent, setShowCalAIContent] = useState(false)
  const [showConclusion, setShowConclusion] = useState(false)
  const [showSkills, setShowSkills] = useState(false)
  const [showSkillsContent, setShowSkillsContent] = useState(false)

  const storyCursorRef = useRef<HTMLSpanElement>(null)
  const rizzGPTCursorRef = useRef<HTMLSpanElement>(null)
  const umaxCursorRef = useRef<HTMLSpanElement>(null)
  const calAICursorRef = useRef<HTMLSpanElement>(null)
  const conclusionCursorRef = useRef<HTMLSpanElement>(null)
  const skillsCursorRef = useRef<HTMLSpanElement>(null)

  const storyContent = [
    "FROM SPRING 2022 TO SPRING 2023 I SHIT MY SELF, I BUILT A COLLEGE MARKETPLACE APP. IT FAILED.",
    "I GRADUATED IN MAY 2023 WITH NO INCOME, SAVINGS, OR ACCOMPLISHMENTS.",
    "I HAD APPLIED TO 100+ JOBS / INTERNSHIPS DURING COLLEGE AND NEVER EVEN GOT A SECOND ROUND INTERVIEW.",
    "I MOVED HOME. MY PARENTS' HOUSE WAS ON THE MARKET AND OUR FAMILY WAS STRAPPED FOR CASH. MY BROTHER GAVE ME LOANS FOR FOOD.",
    "MY ONLY GOAL WAS TO MAKE $50K OVER THE NEXT 12 MONTHS TO BE ABLE TO CONTINUE TO PURSUE ENTREPRENEURSHIP.",
    "I SPENT 12+ HOURS A DAY TEACHING MYSELF TO CODE WITH CHATGPT.",
  ]

  const conclusionContent = [
    "I CREATE AND POST ON X TO HELP OTHERS LEARN AI AND BUILD SOFTWARE TOGETHER.",
    "I CONTINUE TO BUILD SOFTWARE IN STEALTH.",
  ]

  // Type text function with cursor
  const typeText = (
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    cursorRef: React.RefObject<HTMLSpanElement>,
    onComplete?: () => void,
  ) => {
    let i = 0
    const speed = 20 // Faster typing speed

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
    let currentParagraph = 0

    const typeStory = () => {
      if (currentParagraph < storyContent.length) {
        const paragraph = storyContent[currentParagraph]
        setStoryText((prev) => prev + (prev ? "\n\n" : "") + paragraph)
        currentParagraph++

        setTimeout(typeStory, 1000)
      } else {
        if (storyCursorRef.current) {
          storyCursorRef.current.classList.add("blink")
        }

        setTimeout(() => {
          setShowRizzGPT(true)
          typeText("MADE 6 FIGURES IN CRYPTO, JULY 2023", setRizzGPTTitle, rizzGPTCursorRef, () => {
            setShowRizzGPTContent(true)

            setTimeout(() => {
              setShowUmax(true)
              typeText("UMAX, DECEMBER 2023", setUmaxTitle, umaxCursorRef, () => {
                setShowUmaxContent(true)

                setTimeout(() => {
                  setShowCalAI(true)
                  typeText("CAL AI, JUNE 2024", setCalAITitle, calAICursorRef, () => {
                    setShowCalAIContent(true)

                    setTimeout(() => {
                      setShowConclusion(true)
                      let conclusionParagraph = 0

                      const typeConclusion = () => {
                        if (conclusionParagraph < conclusionContent.length) {
                          const paragraph = conclusionContent[conclusionParagraph]
                          setConclusionText((prev) => prev + (prev ? "\n\n" : "") + paragraph)
                          conclusionParagraph++

                          setTimeout(typeConclusion, 1000)
                        } else {
                          if (conclusionCursorRef.current) {
                            conclusionCursorRef.current.classList.add("blink")
                          }

                          setTimeout(() => {
                            setShowSkills(true)
                            typeText("SKILLS", setSkillsTitle, skillsCursorRef, () => {
                              setShowSkillsContent(true)
                            })
                          }, 1000)
                        }
                      }

                      typeConclusion()
                    }, 1000)
                  })
                }, 1000)
              })
            }, 1000)
          })
        }, 1000)
      }
    }

    setTimeout(typeStory, 500)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-2xl mx-auto">
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

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold mb-8 uppercase tracking-tight relative"
        >
          MY STORY
          <motion.span
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white via-white to-transparent"
          />
        </motion.h1>

        <div className="space-y-6">
          <div className="space-y-4 relative">
            <pre className="uppercase text-xs tracking-wide whitespace-pre-line">{storyText}</pre>
            <span ref={storyCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
          </div>

          {showRizzGPT && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-6 border-t border-white/10"
            >
              <h2 className="text-lg font-medium mb-3 uppercase tracking-tight relative">
                {rizzGPTTitle}
                <span ref={rizzGPTCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </h2>

              {showRizzGPTContent && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="list-disc pl-6 space-y-1 uppercase text-xs tracking-wide"
                >
                  <li>3M+ DOWNLOADS</li>
                  <li>4M+ REVENUE</li>
                </motion.ul>
              )}
            </motion.div>
          )}

          {showUmax && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border-t border-white/10 pt-6"
            >
              <h2 className="text-lg font-medium mb-3 uppercase tracking-tight relative">
                {umaxTitle}
                <span ref={umaxCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </h2>

              {showUmaxContent && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="list-disc pl-6 space-y-1 uppercase text-xs tracking-wide"
                >
                  <li>15M+ DOWNLOADS</li>
                  <li>6M+ REVENUE</li>
                </motion.ul>
              )}
            </motion.div>
          )}

          {showCalAI && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border-t border-white/10 pt-6"
            >
              <h2 className="text-lg font-medium mb-3 uppercase tracking-tight relative">
                {calAITitle}
                <span ref={calAICursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </h2>

              {showCalAIContent && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="list-disc pl-6 space-y-1 uppercase text-xs tracking-wide"
                >
                  <li>4M+ DOWNLOADS</li>
                  <li>6M+ REVENUE</li>
                </motion.ul>
              )}
            </motion.div>
          )}

          {showConclusion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 pt-4 border-t border-white/10 relative"
            >
              <pre className="uppercase text-xs tracking-wide whitespace-pre-line">{conclusionText}</pre>
              <span ref={conclusionCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
            </motion.div>
          )}

          {showSkills && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-6 border-t border-white/10"
            >
              <h2 className="text-lg font-medium mb-3 uppercase tracking-tight relative">
                {skillsTitle}
                <span ref={skillsCursorRef} className="h-4 w-2 bg-white inline-block absolute ml-0.5"></span>
              </h2>

              {showSkillsContent && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="list-disc pl-6 space-y-1 uppercase text-xs tracking-wide"
                >
                  <li>CAN CODE IN RT AND SWIFT, DESIGN</li>
                  <li>50 PULLUPS IN A ROW</li>
                  <li>RUN &lt;6 MINUTE MILE</li>
                  <li>MADE 6 FIGURES + IN CRYPTO, NOW MOVING INTO REAL STUFF</li>
                  <li>1100 CHESS.COM</li>
                </motion.ul>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

