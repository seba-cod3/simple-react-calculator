import { OPERATORS } from './constants'

export const prettifyEcuation = (arr: string[]) => {
  let currentElement = ''
  let resultArray = []

  arr.forEach((item) => {
    if (OPERATORS.includes(item)) {
      if (currentElement !== '') {
        resultArray.push(currentElement)
        currentElement = ''
      }
      resultArray.push(item)
    } else {
      currentElement += item
    }
  })

  if (currentElement !== '') {
    resultArray.push(currentElement)
  }

  return resultArray
}

export const isLastIndexOfStringAnOperator = (stringToEvaluate: string | number) => {
  const valueToCondition = stringToEvaluate?.toString()
  return valueToCondition && OPERATORS.includes(valueToCondition.split('')[valueToCondition.split('').length - 1])
}

export const splitByOperators = (valueOrEcuation: string): string[] => {
  const operatorRegex = new RegExp(`[${OPERATORS.map((op) => `\\${op}`).join('')}]`)
  return valueOrEcuation.split(operatorRegex)
}
