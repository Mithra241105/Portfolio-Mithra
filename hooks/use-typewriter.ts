import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!isTyping && !isComplete && displayedText === '') {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
      return () => clearTimeout(timeout);
    }

    if (isTyping && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed + Math.random() * 20); // Add slight randomness for realism
      return () => clearTimeout(timeout);
    }

    if (isTyping && displayedText.length === text.length) {
      setIsTyping(false);
      setIsComplete(true);
    }
  }, [displayedText, isTyping, text, speed, startDelay, isComplete]);

  return { displayedText, isComplete, isTyping };
}
