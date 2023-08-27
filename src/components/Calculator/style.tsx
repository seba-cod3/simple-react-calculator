import styled, { css } from 'styled-components'

const SCWrapper = styled.main`
  background: transparent;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  place-content: center;
`

const SCCardBackground = styled.section`
  backdrop-filter: blur(14px) saturate(165%);
  -webkit-backdrop-filter: blur(14px) saturate(165%);
  background-color: rgba(17, 25, 40, 0.69);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
`

const SCInputWrapper = styled.div`
  min-width: 520px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
const SCInnerWrapper = styled.div`
  padding: 45px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SCContent = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  button {
    background: transparent;
    background-color: #554b4b;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`

const StyledInput = styled.input`
  font-family: monospace;
  padding: 10px 15px;
  font-size: 1rem;
  color: #241f1f;
  outline: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: none;
  }
`

const StyledLabel = styled.label<{
  shouldShow: boolean
  showError: boolean
}>`
  user-select: none;
  font-size: 12px;
  font-family: inherit;
  color: darkgray;
  margin-left: 10px;
  background-color: #241f1f;
  box-shadow: 0 0 2px #726868;
  border-radius: 4px;
  padding: 2px 10px;

  transform: scale(${({ shouldShow }) => (shouldShow ? 1 : 0.5)});
  opacity: ${({ shouldShow }) => (shouldShow ? 1 : 0)};
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  ${({ showError }) =>
    showError
      ? css`
          color: crimson;
          box-shadow: 0 0 5px crimson;
          text-shadow: #6d0015 0px 0px 10px;
        `
      : css`
          color: darkgray;
          box-shadow: 0 0 2px #726868;
          text-shadow: 0px 0px 0px #ffffff;
        `};
`

export { SCInnerWrapper, SCCardBackground, SCWrapper, SCInputWrapper, SCContent, StyledInput, StyledLabel }
