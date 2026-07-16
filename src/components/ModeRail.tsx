import { Moon, Sun, Sunset } from 'lucide-react'
import type { HomeMode } from '../data/content'

const modeIcons = { day: Sun, sunset: Sunset, night: Moon } as const
const modeLabels: Record<HomeMode, string> = { day: 'DAY', sunset: 'SUNSET', night: 'NIGHT' }

type ModeRailProps = {
  mode: HomeMode
  onChange: (mode: HomeMode) => void
}

export function ModeRail({ mode, onChange }: ModeRailProps) {
  return <aside className="mode-panel" aria-label="Home atmosphere modes">
    <div className="mode-panel-heading">
      <span>MODES OF THE HOME</span>
      <strong>{modeLabels[mode]}</strong>
    </div>
    <div className="mode-list" role="group" aria-label="Select home atmosphere">
      {(Object.keys(modeIcons) as HomeMode[]).map((item) => {
        const Icon = modeIcons[item]
        const isActive = item === mode
        return <button className={`mode-button ${isActive ? 'is-active' : ''}`} type="button" aria-pressed={isActive} title={`Switch to ${modeLabels[item].toLowerCase()}`} onClick={() => onChange(item)} key={item}>
          <span className="mode-icon"><Icon size={20} strokeWidth={1.5} /></span>
          <span className="mode-button-label">{modeLabels[item]}</span>
          <span className="mode-tooltip" role="tooltip">{item === 'day' ? 'Natural daylight' : item === 'sunset' ? 'Warm evening light' : 'Low-light atmosphere'}</span>
        </button>
      })}
    </div>
  </aside>
}
