import { useEffect, useState } from 'react'
import { MATH_QUOTES } from '../../assets/quotes'
import { SCQuoteCard, SCQuoteItem } from './style'

export const RandomQuote = () => {
  const [quote, setQuote] = useState({ author: '', quote: '' })
  const [onTransition, setOnTransition] = useState(false)

  const getRandomQuote = () => {
    setOnTransition(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MATH_QUOTES.length)
      const [author, quote] = MATH_QUOTES[randomIndex]
      setQuote({ author, quote })
      setOnTransition(false)
    }, 300)
  }

  useEffect(() => {
    getRandomQuote()

    const intervalId = setInterval(() => {
      getRandomQuote()
    }, 6000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <SCQuoteCard>
      <SCQuoteItem isQuote onTransition={onTransition}>
        "{quote.quote}"
      </SCQuoteItem>
      <SCQuoteItem onTransition={onTransition}>- {quote.author}</SCQuoteItem>
    </SCQuoteCard>
  )
}
