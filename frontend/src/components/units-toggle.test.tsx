import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UnitsToggle } from './units-toggle'

describe('UnitsToggle', () => {
  it('CUR-10 exposes an accessible temperature-unit group with both segments', () => {
    // Arrange / Act
    render(<UnitsToggle unit="celsius" onChange={vi.fn()} />)

    // Assert — a11y: labelled group + named segments, state via aria-pressed (not color)
    expect(screen.getByRole('group', { name: 'Unidade de temperatura' })).toBeInTheDocument()
    const celsius = screen.getByRole('button', { name: 'Celsius' })
    const fahrenheit = screen.getByRole('button', { name: 'Fahrenheit' })
    expect(celsius).toHaveAttribute('aria-pressed', 'true')
    expect(fahrenheit).toHaveAttribute('aria-pressed', 'false')
    expect(celsius).toHaveTextContent('°C')
    expect(fahrenheit).toHaveTextContent('°F')
  })

  it('CUR-10 reflects the active unit from the prop', () => {
    // Arrange / Act
    render(<UnitsToggle unit="fahrenheit" onChange={vi.fn()} />)

    // Assert
    expect(screen.getByRole('button', { name: 'Fahrenheit' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Celsius' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('CUR-10 calls onChange with the picked unit', () => {
    // Arrange
    const onChange = vi.fn()
    render(<UnitsToggle unit="celsius" onChange={onChange} />)

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Fahrenheit' }))

    // Assert
    expect(onChange).toHaveBeenCalledWith('fahrenheit')
  })
})
