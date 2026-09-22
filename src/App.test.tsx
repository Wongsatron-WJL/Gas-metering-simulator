import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Gas Metering Station interface', () => {
  it('shows both runs and all configured pressure values', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Run A' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Run B' })).toBeInTheDocument()
    for (const pressure of ['535', '495', '480', '525', '550', '490', '470', '530']) {
      expect(screen.getAllByText(pressure).length).toBeGreaterThan(0)
    }
  })

  it('updates the detail panel when equipment is selected', () => {
    render(<App />)
    const runBActive = screen.getAllByRole('button', { name: /PCV Active 470 psig/i })[0]
    fireEvent.click(runBActive)
    expect(screen.getByRole('heading', { name: 'Pressure Control Valve — Active' })).toBeInTheDocument()
    expect(runBActive).toHaveAttribute('aria-pressed', 'true')
  })

  it('labels PSV topology as awaiting confirmation', () => {
    render(<App />)
    expect(screen.getAllByText(/Awaiting engineering confirmation/).length).toBeGreaterThan(0)
  })
})
