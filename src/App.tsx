import { useState } from 'react'

type Equipment = {
  id: string
  name: string
  shortName: string
  run: 'Run A' | 'Run B'
  pressure: number
  kind: 'SSV' | 'PCV' | 'PSV'
  description: string
  topologyPending?: boolean
}

const equipment: Equipment[] = [
  { id: 'a-ssv', name: 'Safety Shut-off Valve', shortName: 'SSV', run: 'Run A', pressure: 535, kind: 'SSV', description: 'An isolation valve shown at the inlet of this metering run.' },
  { id: 'a-monitor', name: 'Pressure Control Valve — Monitor', shortName: 'PCV Monitor', run: 'Run A', pressure: 495, kind: 'PCV', description: 'The monitor pressure-control valve shown in the provided process sequence.' },
  { id: 'a-active', name: 'Pressure Control Valve — Active', shortName: 'PCV Active', run: 'Run A', pressure: 480, kind: 'PCV', description: 'The active pressure-control valve shown in the provided process sequence.' },
  { id: 'a-psv', name: 'Pressure Safety Valve', shortName: 'PSV', run: 'Run A', pressure: 525, kind: 'PSV', description: 'A pressure safety valve displayed in the currently provided process sequence.', topologyPending: true },
  { id: 'b-ssv', name: 'Safety Shut-off Valve', shortName: 'SSV', run: 'Run B', pressure: 550, kind: 'SSV', description: 'An isolation valve shown at the inlet of this metering run.' },
  { id: 'b-monitor', name: 'Pressure Control Valve — Monitor', shortName: 'PCV Monitor', run: 'Run B', pressure: 490, kind: 'PCV', description: 'The monitor pressure-control valve shown in the provided process sequence.' },
  { id: 'b-active', name: 'Pressure Control Valve — Active', shortName: 'PCV Active', run: 'Run B', pressure: 470, kind: 'PCV', description: 'The active pressure-control valve shown in the provided process sequence.' },
  { id: 'b-psv', name: 'Pressure Safety Valve', shortName: 'PSV', run: 'Run B', pressure: 530, kind: 'PSV', description: 'A pressure safety valve displayed in the currently provided process sequence.', topologyPending: true },
]

const glossary = [
  ['SSV', 'Safety Shut-off Valve — an isolation valve represented in each run.'],
  ['PCV Monitor', 'The monitor pressure-control valve in the supplied process sequence.'],
  ['PCV Active', 'The active pressure-control valve in the supplied process sequence.'],
  ['PSV', 'Pressure Safety Valve — its Version 1 location is awaiting engineering confirmation.'],
  ['Common Header', 'The shared downstream pipe where Run A and Run B converge before the power plant.'],
]

function ValveSymbol({ kind }: { kind: Equipment['kind'] }) {
  return (
    <svg className={`valve-symbol ${kind.toLowerCase()}`} viewBox="0 0 80 48" aria-hidden="true">
      <line x1="0" y1="24" x2="18" y2="24" />
      <path d="M18 10 L40 24 L18 38 Z M62 10 L40 24 L62 38 Z" />
      <line x1="62" y1="24" x2="80" y2="24" />
      {kind === 'PCV' && <><line x1="40" y1="24" x2="40" y2="8" /><circle cx="40" cy="7" r="6" /></>}
      {kind === 'PSV' && <><line x1="40" y1="24" x2="40" y2="5" /><path d="M31 7h18l-4-5h-10z" /></>}
    </svg>
  )
}

function EquipmentButton({ item, selected, onSelect }: { item: Equipment; selected: boolean; onSelect: () => void }) {
  return (
    <button className={`equipment ${selected ? 'selected' : ''} ${item.topologyPending ? 'pending' : ''}`} onClick={onSelect} aria-pressed={selected}>
      <span className="equipment-visual"><ValveSymbol kind={item.kind} /></span>
      <span className="equipment-name">{item.shortName}</span>
      <span className="pressure">{item.pressure} <small>psig</small></span>
      <span className="value-label">Configured value</span>
      {item.topologyPending && <span className="pending-dot" title="Awaiting engineering confirmation" />}
    </button>
  )
}

function ProcessRun({ name, selected, onSelect }: { name: 'Run A' | 'Run B'; selected: Equipment; onSelect: (item: Equipment) => void }) {
  const runItems = equipment.filter((item) => item.run === name)
  return (
    <section className="process-run" aria-labelledby={`${name}-heading`}>
      <div className="run-heading">
        <span className="run-index">{name === 'Run A' ? 'A' : 'B'}</span>
        <div><h2 id={`${name}-heading`}>{name}</h2><p>Metering &amp; pressure regulation train</p></div>
        <span className="run-status"><i /> Learning mode</span>
      </div>
      <div className="equipment-row">
        {runItems.map((item, index) => (
          <div className="equipment-stage" key={item.id}>
            <EquipmentButton item={item} selected={selected.id === item.id} onSelect={() => onSelect(item)} />
            {index < runItems.length - 1 && <div className="pipe" aria-hidden="true"><span>FLOW</span></div>}
          </div>
        ))}
      </div>
      <div className="topology-note"><span>!</span> PSV position shown per current sequence · <strong>Awaiting engineering confirmation</strong></div>
    </section>
  )
}

function DetailPanel({ item }: { item: Equipment }) {
  return (
    <aside className="detail-panel" aria-live="polite">
      <div className="panel-kicker">Selected equipment</div>
      <div className="detail-title"><ValveSymbol kind={item.kind} /><div><span>{item.shortName}</span><h2>{item.name}</h2></div></div>
      <dl>
        <div><dt>Run</dt><dd>{item.run}</dd></div>
        <div><dt>Configured pressure</dt><dd className="detail-pressure">{item.pressure} <small>psig</small></dd></div>
        <div><dt>Current engineering status</dt><dd><span className="status-badge">Configuration reference only</span></dd></div>
      </dl>
      <div className="description"><h3>Equipment description</h3><p>{item.description}</p></div>
      {item.topologyPending && <div className="engineering-alert"><strong>Engineering clarification required</strong><p>PSV topology is awaiting engineering confirmation.</p></div>}
      <div className="scope-note"><strong>Version 1 scope</strong><p>This value is informational. No control, trip, takeover, or relief behavior is assigned.</p></div>
    </aside>
  )
}

export default function App() {
  const [selected, setSelected] = useState(equipment[0])
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3l15 8v18l-15 8-15-8V11z"/><path d="M13 25V15h14v10M13 20h14"/></svg></div>
        <div className="brand"><span>Process Learning Systems</span><h1>Gas Metering Station</h1></div>
        <div className="header-meta"><span className="version">Version 1</span><span className="mode"><i /> Static learning mode</span></div>
      </header>

      <main>
        <div className="page-intro">
          <div><p className="eyebrow">Interactive process overview</p><h2>Station flow &amp; equipment configuration</h2><p>Select any equipment item to review its configured pressure and current engineering status.</p></div>
          <div className="legend"><span><i className="legend-ready" /> Configured</span><span><i className="legend-pending" /> Confirmation required</span></div>
        </div>

        <div className="workspace">
          <div className="diagram-card">
            <div className="flow-terminal inlet"><div className="terminal-icon">→</div><div><span>UPSTREAM SUPPLY</span><strong>Gas Inlet</strong></div><div className="flow-label">FLOW ↓</div></div>
            <div className="split-pipe" aria-hidden="true"><i /><span /><b /></div>
            <div className="runs">
              <ProcessRun name="Run A" selected={selected} onSelect={setSelected} />
              <ProcessRun name="Run B" selected={selected} onSelect={setSelected} />
            </div>
            <div className="merge-pipe" aria-hidden="true"><i /><span /><b /></div>
            <div className="downstream-flow">
              <div className="flow-terminal header"><div className="terminal-icon">≋</div><div><span>COMBINED OUTLET</span><strong>Common Header</strong></div></div>
              <div className="down-arrow"><span>FLOW</span>↓</div>
              <div className="flow-terminal plant"><div className="terminal-icon">⌁</div><div><span>DOWNSTREAM USER</span><strong>Power Plant</strong></div></div>
            </div>
          </div>
          <DetailPanel item={selected} />
        </div>

        <section className="glossary">
          <div className="section-heading"><div><p className="eyebrow">Learning reference</p><h2>Equipment glossary</h2></div><p>Plain-language definitions for this static diagram.</p></div>
          <div className="glossary-grid">{glossary.map(([term, definition]) => <article key={term}><span>{term}</span><p>{definition}</p></article>)}</div>
        </section>

        <section className="engineering-banner"><div className="alert-icon">!</div><div><h2>Engineering boundaries — Version 1</h2><p>All pressures are <strong>Configured Pressure Values</strong> only. Functional intent, cause &amp; effect, valve actions, and PSV topology remain outside this version until confirmed by engineering.</p></div></section>
      </main>
      <footer><span>Training interface · Static configuration reference</span><span>Not for operational decision-making</span></footer>
    </div>
  )
}
