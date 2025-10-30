import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface TypingTestProps {
  duration: number;
  onComplete: (wpm: number, accuracy: number, errors: number) => void;
  settings: {
    punctuation: boolean;
    numbers: boolean;
  };
}

const WORD_BANK = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "as", "you", "do", "at", "this", "but",
  "by", "from", "they", "we", "say", "her", "she", "or", "an", "will",
  "one", "all", "would", "there", "their", "what", "so", "up", "out", "if",
  "about", "who", "get", "which", "go", "me", "when", "make", "can", "like",
  "time", "no", "just", "him", "know", "take", "people", "into", "year", "your",
  "good", "some", "could", "them", "see", "other", "than", "then", "now", "look",
  "only", "come", "its", "over", "think", "also", "back", "after", "use", "two",
  "how", "our", "work", "first", "well", "way", "even", "new", "want", "because",
  "any", "these", "give", "day", "most", "us", "is", "was", "are", "been"
];

const PUNCTUATION = [".", ",", "!", "?", ";", ":"];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const generateWords = (count: number, addPunctuation: boolean, addNumbers: boolean): string[] => {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    let word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    
    // Add numbers randomly
    if (addNumbers && Math.random() < 0.1) {
      word = NUMBERS[Math.floor(Math.random() * NUMBERS.length)] + word;
    }
    
    // Add punctuation randomly
    if (addPunctuation && Math.random() < 0.15) {
      word = word + PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
    }
    
    words.push(word);
  }
  return words;
};

const TypingTest = ({ duration, onComplete, settings }: TypingTestProps) => {
  const [words, setWords] = useState(() => generateWords(200, settings.punctuation, settings.numbers));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [charStatuses, setCharStatuses] = useState<string[][]>(
    words.map(word => new Array(word.length).fill("pending"))
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }
  }, [isActive, timeLeft]);

  useEffect(() => {
    // Auto focus on mount
    containerRef.current?.focus();
  }, []);

  const finishTest = useCallback(() => {
    setIsActive(false);
    const wpm = Math.round((correctChars / 5 / duration) * 60);
    const accuracy = totalCharsTyped > 0 
      ? Math.round((correctChars / totalCharsTyped) * 100) 
      : 0;
    onComplete(wpm, accuracy, errors);
  }, [correctChars, duration, totalCharsTyped, errors, onComplete]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (timeLeft === 0) return;
    
    const key = e.key;
    
    // Handle Tab + Enter for restart
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      resetTest();
      return;
    }
    
    // Start test on first keypress
    if (!isActive && key.length === 1) {
      setIsActive(true);
    }

    const currentWord = words[currentWordIndex];
    
    // Handle space - move to next word
    if (key === ' ') {
      e.preventDefault();
      if (input.length > 0) {
        setCurrentWordIndex(prev => prev + 1);
        setInput("");
      }
      return;
    }
    
    // Handle backspace
    if (key === 'Backspace') {
      e.preventDefault();
      if (input.length > 0) {
        const newInput = input.slice(0, -1);
        setInput(newInput);
        
        // Update char status
        const newCharStatuses = [...charStatuses];
        newCharStatuses[currentWordIndex][input.length - 1] = "pending";
        setCharStatuses(newCharStatuses);
      } else if (currentWordIndex > 0) {
        // Move to previous word if at start of current word
        setCurrentWordIndex(prev => prev - 1);
        setInput(words[currentWordIndex - 1]);
      }
      return;
    }
    
    // Handle regular character input
    if (key.length === 1 && input.length < currentWord.length + 5) {
      e.preventDefault();
      const newInput = input + key;
      setInput(newInput);
      setTotalCharsTyped(prev => prev + 1);
      
      const charIndex = input.length;
      const newCharStatuses = [...charStatuses];
      
      if (charIndex < currentWord.length) {
        if (key === currentWord[charIndex]) {
          newCharStatuses[currentWordIndex][charIndex] = "correct";
          setCorrectChars(prev => prev + 1);
        } else {
          newCharStatuses[currentWordIndex][charIndex] = "incorrect";
          setErrors(prev => prev + 1);
        }
      } else {
        // Extra character
        newCharStatuses[currentWordIndex].push("incorrect");
        setErrors(prev => prev + 1);
      }
      
      setCharStatuses(newCharStatuses);
    }
  }, [timeLeft, isActive, input, currentWordIndex, words, charStatuses]);

  const resetTest = useCallback(() => {
    const newWords = generateWords(200, settings.punctuation, settings.numbers);
    setWords(newWords);
    setCurrentWordIndex(0);
    setInput("");
    setTimeLeft(duration);
    setIsActive(false);
    setErrors(0);
    setCorrectChars(0);
    setTotalCharsTyped(0);
    setCharStatuses(newWords.map(word => new Array(word.length).fill("pending")));
    containerRef.current?.focus();
  }, [duration, settings]);

  const handleFocus = () => {
    containerRef.current?.focus();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-primary">
          {timeLeft} seconds
        </div>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={resetTest}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>

      <div 
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        className="relative min-h-[200px] p-8 bg-card/30 rounded-lg border border-border cursor-text outline-none focus:border-primary/50 transition-colors"
        onClick={handleFocus}
      >
        <div className="typing-text flex flex-wrap gap-x-3 gap-y-2 select-none">
          {words.slice(0, 50).map((word, wordIdx) => (
            <span
              key={wordIdx}
              className={`
                relative
                ${wordIdx === currentWordIndex ? "opacity-100" : "opacity-40"}
                transition-opacity duration-150
              `}
            >
              {word.split("").map((char, charIdx) => {
                const status = charStatuses[wordIdx]?.[charIdx] || "pending";
                return (
                  <span
                    key={charIdx}
                    className={`
                      ${status === "correct" ? "text-success" : ""}
                      ${status === "incorrect" ? "text-error" : ""}
                      ${status === "pending" ? "text-muted-foreground" : ""}
                      ${wordIdx === currentWordIndex && charIdx === input.length ? "border-l-2 border-primary animate-pulse" : ""}
                    `}
                  >
                    {char}
                  </span>
                );
              })}
              {/* Show extra characters typed */}
              {wordIdx === currentWordIndex && input.length > word.length && (
                <span className="text-error">
                  {input.slice(word.length)}
                </span>
              )}
            </span>
          ))}
        </div>
        
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
            <p className="text-xl text-foreground">Click here or start typing to begin</p>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground space-x-6">
        <span>ctrl + enter — restart test</span>
        <span>backspace — delete character</span>
      </div>
    </div>
  );
};

export default TypingTest;
