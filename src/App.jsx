import { useState } from 'react'
import './App.css'

const BASES = [
  { value: 2, name: 'Binária', digits: '0–1', symbol: '01' },
  { value: 3, name: 'Ternária', digits: '0–2', symbol: '012' },
  { value: 4, name: 'Quaternária', digits: '0–3', symbol: '0123' },
  { value: 8, name: 'Octal', digits: '0–7', symbol: '01234567' },
  { value: 10, name: 'Decimal', digits: '0–9', symbol: '0123456789' },
  { value: 16, name: 'Hexadecimal', digits: '0–9, A–F', symbol: '0123456789ABCDEF' },
]

function parseInBase(value, base) {
  return [...value.toUpperCase()].reduce(
    (total, character) => total * BigInt(base) + BigInt(parseInt(character, base)),
    0n,
  )
}

function getBase(base) {
  return BASES.find((item) => item.value === Number(base))
}

function App() {
  const [fromBase, setFromBase] = useState('10')
  const [toBase, setToBase] = useState('2')
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function handleConvert(event) {
    event.preventDefault()
    setError('')

    if (fromBase === toBase) {
      setError('Não é possível converter uma base nela mesma. Escolha bases diferentes.')
      return
    }

    const source = getBase(fromBase)
    const validCharacters = new RegExp(`^[${source.symbol}]+$`, 'i')
    if (!value || !validCharacters.test(value)) {
      setError(`Digite um número inteiro positivo usando apenas os dígitos da base ${fromBase} (${source.digits}).`)
      return
    }

    const decimalValue = parseInBase(value, Number(fromBase))
    if (decimalValue === 0n) {
      setError('O valor precisa ser maior que zero.')
      return
    }

    setResult({
      original: value.toUpperCase(),
      converted: decimalValue.toString(Number(toBase)).toUpperCase(),
      from: source,
      to: getBase(toBase),
    })
  }

  function handleRestart() {
    setValue('')
    setError('')
    setResult(null)
    setFromBase('10')
    setToBase('2')
  }

  return (
    <main className="app-shell">
      <section className="main-content">
        <section className="converter-card" aria-label="Conversor de bases numéricas">
          <div className="card-heading">
            <div>
              <h2>Fazer conversão</h2>
            </div>
          </div>

          {result ? (
            <div className="result-view" aria-live="polite">
              <div className="success-label"><span className="checkmark">✓</span> Conversão concluída</div>
              <p className="result-caption">Seu número em base {result.to.value} ({result.to.name.toLowerCase()})</p>
              <div className="result-box">
                <span className="result-base">BASE {result.to.value}</span>
                <output className="result-value" aria-label={`Resultado: ${result.converted}`}>{result.converted}</output>
                <div className="result-expression">{result.original}<span>₍{result.from.value}₎</span><span className="expression-arrow">→</span>{result.converted}<span>₍{result.to.value}₎</span></div>
              </div>
              <button className="restart-button" type="button" onClick={handleRestart}>
                <span aria-hidden="true">↺</span> Recomeçar
              </button>
            </div>
          ) : (
            <form onSubmit={handleConvert} noValidate>
              <div className="base-fields">
                <label className="field-group" htmlFor="from-base">
                  <span className="field-label">Converter de</span>
                  <span className="select-wrap">
                    <select id="from-base" value={fromBase} onChange={(event) => { setFromBase(event.target.value); setError('') }}>
                      {BASES.map((base) => <option value={base.value} key={base.value}>{base.name} · base {base.value}</option>)}
                    </select>
                    <span className="select-chevron" aria-hidden="true">⌄</span>
                  </span>
                </label>
                <div className="direction-icon" aria-hidden="true">→</div>
                <label className="field-group" htmlFor="to-base">
                  <span className="field-label">Converter para</span>
                  <span className="select-wrap">
                    <select id="to-base" value={toBase} onChange={(event) => { setToBase(event.target.value); setError('') }}>
                      {BASES.map((base) => <option value={base.value} key={base.value}>{base.name} · base {base.value}</option>)}
                    </select>
                    <span className="select-chevron" aria-hidden="true">⌄</span>
                  </span>
                </label>
              </div>

              <label className="field-group number-field" htmlFor="number-value">
                <span className="field-label">Seu número</span>
                <span className="input-wrap">
                  <input
                    id="number-value"
                    type="text"
                    inputMode={fromBase === '16' ? 'text' : 'numeric'}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder={fromBase === '16' ? 'Ex.: 2A3F' : `Ex.: ${fromBase === '10' ? '1024' : '101101'}`}
                    value={value}
                    onChange={(event) => { setValue(event.target.value); setError('') }}
                    aria-describedby={error ? 'form-error' : 'number-hint'}
                    aria-invalid={Boolean(error)}
                  />
                  <span className="input-base">BASE {fromBase}</span>
                </span>
                <span className="field-hint" id="number-hint">Somente inteiros positivos · {getBase(fromBase).digits}</span>
              </label>

              {error && <div className="error-message" id="form-error" role="alert"><span aria-hidden="true">!</span>{error}</div>}

              <button className="convert-button" type="submit">
                Converter número <span aria-hidden="true">↗</span>
              </button>
              <p className="privacy-note"><span aria-hidden="true">◈</span> Seus dados ficam só por aqui. Nada é enviado.</p>
            </form>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
