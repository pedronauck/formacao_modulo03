import type { TemperatureUnit } from '@/types/temperature-unit'

type UnitsToggleProps = {
  unit: TemperatureUnit
  onChange: (unit: TemperatureUnit) => void
}

const OPTIONS: { unit: TemperatureUnit; label: string; name: string }[] = [
  { unit: 'celsius', label: '°C', name: 'Celsius' },
  { unit: 'fahrenheit', label: '°F', name: 'Fahrenheit' },
]

export function UnitsToggle({ unit, onChange }: UnitsToggleProps) {
  return (
    <div className="wx-units" role="group" aria-label="Unidade de temperatura">
      {OPTIONS.map((option) => {
        const active = option.unit === unit
        return (
          <button
            key={option.unit}
            type="button"
            className={active ? 'on' : undefined}
            aria-pressed={active}
            aria-label={option.name}
            onClick={() => onChange(option.unit)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
