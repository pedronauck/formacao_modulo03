import { test, expect } from './support/mock'
import { searchAndPick } from './support/actions'

// CUR-10 "Feature de toggle de medidas": the °C/°F segmented control in the top
// bar converts every temperature client-side (no refetch). The default forecast
// fixture (forecast-day.json) has current.temperature_2m = 25.7°C → 26°C, and
// 25.7 × 9/5 + 32 = 78.26°F → 78°F.
test.describe('Units toggle (°C/°F)', () => {
  test('CUR-10 converts the hero temperature when switching units and back', async ({ page }) => {
    // Arrange
    await page.goto('/')
    await searchAndPick(page, 'São Paulo')

    const hero = page.getByRole('region', { name: /Clima atual/i })
    const heroTemp = hero.locator('.wx-temp')

    // Assert — Celsius is the default and the control reflects it
    await expect(heroTemp).toHaveText('26°')
    await expect(page.getByRole('button', { name: 'Celsius' })).toHaveAttribute('aria-pressed', 'true')

    // Act — switch to Fahrenheit
    await page.getByRole('button', { name: 'Fahrenheit' }).click()

    // Assert — hero temperature converted to °F and the control updated
    await expect(heroTemp).toHaveText('78°')
    await expect(page.getByRole('button', { name: 'Fahrenheit' })).toHaveAttribute('aria-pressed', 'true')

    // Act — switch back to Celsius
    await page.getByRole('button', { name: 'Celsius' }).click()

    // Assert — original Celsius reading restored
    await expect(heroTemp).toHaveText('26°')
  })
})
