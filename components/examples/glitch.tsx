"use client";

import { useState, useEffect, useMemo } from "react";

interface Word {
  text: string;
  color: string;
}

export default function GlitchBanner() {
  const words: Word[] = useMemo(
    () => [
      { text: "UNIQUE", color: "#FFB3C0" },
      { text: "COOL", color: "#FFA36F" },
      { text: "GREAT", color: "#FDE047" },
      { text: "AWESOME", color: "#8FC0F7" },
      { text: "TOP", color: "#C7A4FF" },
    ],
    []
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState<Word>({
    text: words[currentWordIndex].text,
    color: words[currentWordIndex].color,
  });
  const [glitchActive, setGlitchActive] = useState(false);

  const GLYPHS = "!$%&/()=?¡*+_-.,;:[]{}^<>'~#|@abcdefghijk1234567890";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      setGlitchActive(true);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  const MAX_GLITCH_CHARACTERS = 10;

  useEffect(() => {
    if (glitchActive) {
      const glitchInterval = setInterval(() => {
        const newText = Array.from(
          { length: currentText.text.length },
          (_, i) => {
            if (i < MAX_GLITCH_CHARACTERS) {
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            return currentText.text[i];
          }
        ).join("");
        setCurrentText({ text: newText, color: currentText.color });
      }, 50);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitchActive(false);
        setCurrentText({
          text: words[currentWordIndex].text,
          color: words[currentWordIndex].color,
        });
      }, 400);
    }
  }, [currentText, glitchActive, words, currentWordIndex]);

  return (
    <section className="w-full h-[400px] flex justify-center">
      <h1 className="flex flex-col justify-center w-full h-full text-black dark:text-white max-w-2xl max-lg:text-5xl text-7xl font-extrabold max-lg:text-center tracking-tighter">
        <span>BUILDING</span>
        <span style={{ color: currentText.color }}>
          {currentText.text.split("").map((char, index) => (
            <span
              key={index}
              data-char={char}
              style={
                {
                  "--index": index,
                  "--char-1": `"${
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  }"`,
                  "--char-2": `"${
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  }"`,
                  "--char-3": `"${
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  }"`,
                } as any
              }
            >
              {char}
            </span>
          ))}
        </span>
        <span>PRODUCTS</span>
      </h1>
    </section>
  );
}
