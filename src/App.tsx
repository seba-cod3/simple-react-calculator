import './App.css'
import reactLogo from './assets/react.svg'
import { Calculator } from './components/Calculator'
import viteLogo from '/vite.svg'
import styled from 'styled-components'

const AppLayout = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 50px;
`

function App() {
  return (
    <AppLayout>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Calculator />
    </AppLayout>
  )
}

export default App
