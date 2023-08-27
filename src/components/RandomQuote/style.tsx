import styled, { css } from 'styled-components'

const SCQuoteCard = styled.div`
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  text-align: center;
  background-color: transparent;
  padding: 20px;
  border-radius: 4px;
  box-shadow: rgb(204, 204, 204) 0px 0px 3px;
  width: 100%;
  box-sizing: border-box;
`

const SCQuoteItem = styled.p<{ isQuote?: boolean; onTransition: true }>`
  transition: 0.4s ease-out;

  ${({ isQuote }) =>
    isQuote
      ? css`
          margin: 10px 0;
          font-style: italic;
        `
      : css`
          font-weight: bold;
          text-align: right;
        `};

  ${({ onTransition }) =>
    onTransition
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `};
`

export { SCQuoteCard, SCQuoteItem }
