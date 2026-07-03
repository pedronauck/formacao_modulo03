import { describe, it, expect } from 'vitest'
import {
  celsiusToFahrenheit,
  formatTemperature,
  roundTemperature,
  formatTime,
  formatCardinal,
  formatPercent,
} from './format'

describe('format', () => {
  it('#42 rounds temperature in °C and handles null with a placeholder', () => {
    // Assert
    expect(formatTemperature(20.6)).toBe('21°')
    expect(roundTemperature(20.4)).toBe('20')
    expect(formatTemperature(null)).toBe('—')
  })

  it('CUR-10 converts temperature to Fahrenheit when the unit is fahrenheit', () => {
    // Assert — F = C × 9/5 + 32, rounded
    expect(celsiusToFahrenheit(0)).toBe(32)
    expect(celsiusToFahrenheit(100)).toBe(212)
    expect(formatTemperature(20, 'fahrenheit')).toBe('68°')
    expect(formatTemperature(21.4, 'fahrenheit')).toBe('71°') // 70.52 → 71
    expect(roundTemperature(37, 'fahrenheit')).toBe('99') // 98.6 → 99
    expect(formatTemperature(20, 'celsius')).toBe('20°')
    expect(formatTemperature(null, 'fahrenheit')).toBe('—')
  })

  it('#42 extracts HH:mm from an ISO timestamp', () => {
    // Assert
    expect(formatTime('2026-06-25T14:30')).toBe('14:30')
    expect(formatTime('2026-06-25T08:05:00')).toBe('08:05')
    expect(formatTime(null)).toBe('—')
  })

  it('#42 maps wind degrees to a cardinal point', () => {
    // Assert
    expect(formatCardinal(0)).toBe('N')
    expect(formatCardinal(90)).toBe('L')
    expect(formatCardinal(180)).toBe('S')
    expect(formatCardinal(270)).toBe('O')
    expect(formatCardinal(null)).toBe('—')
  })

  it('#42 formats percentages and treats null as placeholder', () => {
    // Assert
    expect(formatPercent(48.2)).toBe('48%')
    expect(formatPercent(null)).toBe('—')
  })
})
