import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { CALCULATOR_KEYS, ONE_HUNDRED_PERCENTAGE, OPERATORS } from '../../constants'
import { isLastIndexOfStringAnOperator, prettifyEcuation, splitByOperators } from '../../utils'
import { RandomQuote } from '../RandomQuote'
import { SCCardBackground, SCContent, SCInnerWrapper, SCInputWrapper, SCWrapper, StyledInput, StyledLabel } from './style'

export const Calculator = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [currentValue, setCurrentValue] = useState('')
  const [lastSentence, setLastSentence] = useState('')
  const [errorText, setErrorText] = useState('')

  const handleChangeInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (isLastIndexOfStringAnOperator(currentValue) && isLastIndexOfStringAnOperator(value)) {
      setErrorText('Operators are only allowed between segments, add some number')
      return
    }

    const segments = splitByOperators(value)
    const lastSegment = segments[segments.length - 1].slice(0, -1)
    const lastEntry = value.split('')[value.length - 1]

    const lastEntryIsDot = lastEntry === '.'
    if (lastEntryIsDot && lastSegment.includes('.')) {
      setErrorText('Bad decimal sintax')
      return
    }

    const lastEntryIsParenthesis = lastEntry === ')' || lastEntry === '('
    if (lastEntryIsParenthesis) {
      const latestAddition = value.split('').pop()
      if (
        (lastSegment.includes('(') && latestAddition === '(') ||
        (lastSegment.includes(')') && latestAddition === ')') ||
        (!lastSegment.includes('(') && latestAddition === ')')
      )
        setErrorText('Bad parenthesis sintax')
      return
    }

    const hasOpenParenthesisIncomingOperator =
      lastSegment.includes('(') && !lastSegment.includes(')') && isLastIndexOfStringAnOperator(value)
    if (hasOpenParenthesisIncomingOperator) {
      setErrorText('Missing close parenthesis')
      return
    }

    const unAllowed = value
      .split('')
      .some((char: string) => !OPERATORS.includes(char) && char !== '(' && char !== ')' && char !== '.' && isNaN(+char))
    if (unAllowed) {
      return
    }

    if (errorText) setErrorText('')
    setCurrentValue(value.trim())
  }

  // Mouse calculator
  const handleSelectItem = (calculatorButtonValue: string) => {
    if (calculatorButtonValue === 'AC') {
      clearInput()
    } else if (calculatorButtonValue === '=') {
      getResult()
    } else {
      if (isLastIndexOfStringAnOperator(currentValue)) {
        return
      }
      if (errorText) setErrorText('')
      setCurrentValue((prev) => `${prev}${calculatorButtonValue}`.trim())
    }

    inputRef.current?.focus()
  }

  const onKeyDownAction = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter' && currentValue) {
      getResult()
    }
    if (key === 'Delete') {
      clearInput()
    }
  }

  const clearInput = () => {
    setCurrentValue('')
    setLastSentence('')
    setErrorText('')
  }

  const getResult = () => {
    if (!currentValue) return
    try {
      if (currentValue.includes('%')) {
        const [valueOrEcuation, percentageToObtain] = currentValue.split('%')
        if (valueOrEcuation && percentageToObtain) {
          const maxPercentageValue = eval(valueOrEcuation.trim())
          const percentage = (+maxPercentageValue * +percentageToObtain) / ONE_HUNDRED_PERCENTAGE
          setLastSentence(
            prettifyEcuation(valueOrEcuation.trim().split('')).join(' ') + ' % ' + percentageToObtain + ' = ' + percentage.toString() + '%'
          )
          setCurrentValue(percentage.toString() + '%')
          return
        } else {
          setErrorText('Value or percentage not found')
        }
      }

      const res = eval(currentValue.trim())
      setLastSentence(prettifyEcuation(currentValue.split('')).join(' ') + ' = ' + res)
      setCurrentValue(res)
    } catch (e) {
      setErrorText('Sintax Error')
      setCurrentValue('Error')
    }
  }

  return (
    <SCWrapper>
      <SCCardBackground>
        <SCInnerWrapper>
          <SCInputWrapper>
            <StyledInput
              autoComplete="off"
              id="main_input"
              ref={inputRef}
              value={currentValue}
              type="text"
              onChange={handleChangeInput}
              onKeyDown={onKeyDownAction}
            />
            <StyledLabel shouldShow={!!lastSentence} showError={!!errorText}>
              {errorText ? errorText : lastSentence}
            </StyledLabel>
          </SCInputWrapper>
          <SCContent>
            {CALCULATOR_KEYS.map((el) => (
              <button key={`el_${el}`} name={el} onClick={() => handleSelectItem(el)}>
                {el}
              </button>
            ))}
          </SCContent>
          <RandomQuote />
        </SCInnerWrapper>
      </SCCardBackground>
    </SCWrapper>
  )
}
