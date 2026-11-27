
import { useState } from 'react'
import './App.css'

function App() {
  const [pagina, setPagina] = useState('Inicio')

  const menu = [
    { nombre: 'Inicio', icono: '⌂' },
    { nombre: 'Temperatura', icono: '♨' },
    { nombre: 'Presencia', icono: '◉' },
    { nombre: 'Iluminación', icono: '☼' },
    { nombre: 'Consumo', icono: 'ϟ' },
    { nombre: 'Automatizaciones', icono: '⚙' },
    { nombre: 'Usuarios', icono: '♙' },
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">B</div>
          <div>
            <h2>BURU<span>ENERGY</span></h2>
            <small>CONTROL SYSTEM</small>
          </div>
        </div>

        <div className="menu-title">MENÚ PRINCIPAL</div>

        <nav>
          {menu.map((item) => (
            <button
              key={item.nombre}
              className={pagina === item.nombre ? 'menu-item active' : 'menu-item'}
              onClick={() => setPagina(item.nombre)}
            >
              <span className="menu-icon">{item.icono}</span>
              {item.nombre}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="connection">
            <span className="status-dot"></span>
            Sistema local
            <small>En desarrollo</small>
          </div>
          <p>BURU ENERGY CONTROL</p>
          <small>Versión 1.0</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="breadcrumb">BURU ENERGY CONTROL /</span>
            <h1>{pagina}</h1>
          </div>
          <div className="profile">
            <div className="avatar">S</div>
            <div>
              <strong>Administrador</strong>
              <small>Panel de control</small>
            </div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <span className="eyebrow">PLATAFORMA IoT · EFICIENCIA ENERGÉTICA</span>
            <h2>Bienvenido a <span>BURU ENERGY</span></h2>
            <p>Monitorización y gestión inteligente de tu espacio.</p>
          </div>
          <div className="welcome-symbol">ϟ</div>
        </section>

        <div className="section-heading">
          <div>
            <h2>Resumen del sistema</h2>
            <p>Estado general de los dispositivos y sensores</p>
          </div>
          <span className="demo-label">● MODO DEMOSTRACIÓN</span>
        </div>

        <section className="cards">
          <article className="metric-card purple">
            <div className="card-top">
              <span>Temperatura</span>
              <span className="metric-icon">♨</span>
            </div>
            <h3>-- <small>°C</small></h3>
            <p>Esperando datos del sensor DHT22</p>
            <div className="card-line"></div>
          </article>

          <article className="metric-card blue">
            <div className="card-top">
              <span>Humedad</span>
              <span className="metric-icon">◌</span>
            </div>
            <h3>-- <small>%</small></h3>
            <p>Esperando datos del sensor</p>
            <div className="card-line"></div>
          </article>

          <article className="metric-card green">
            <div className="card-top">
              <span>Presencia</span>
              <span className="metric-icon">◉</span>
            </div>
            <h3>--</h3>
            <p>Esperando datos del sensor PIR</p>
            <div className="card-line"></div>
          </article>

          <article className="metric-card orange">
            <div className="card-top">
              <span>Consumo eléctrico</span>
              <span className="metric-icon">ϟ</span>
            </div>
            <h3>-- <small>W</small></h3>
            <p>Medidor pendiente de conexión</p>
            <div className="card-line"></div>
          </article>
        </section>

        <section className="lower-grid">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <h3>Control de iluminación</h3>
                <p>Gestión de la luz de prueba mediante relé</p>
              </div>
              <span className="tag">RELÉ</span>
            </div>
            <div className="light-control">
              <div className="light-icon">☼</div>
              <div>
                <strong>Iluminación del aula</strong>
                <p>Pendiente de conexión con Node-RED</p>
              </div>
              <span className="waiting">Sin conexión</span>
            </div>
          </article>

          <article className="panel system-panel">
            <div className="panel-heading">
              <div>
                <h3>Estado de la plataforma</h3>
                <p>Servicios del sistema</p>
              </div>
            </div>
            <div className="service-row">
              <span>Interfaz web</span>
              <span className="service-ok">● Activa</span>
            </div>
            <div className="service-row">
              <span>Node-RED</span>
              <span className="service-pending">○ Por integrar</span>
            </div>
            <div className="service-row">
              <span>MQTT</span>
              <span className="service-pending">○ Por integrar</span>
            </div>
            <div className="service-row">
              <span>ESP32</span>
              <span className="service-pending">○ Por conectar</span>
            </div>
          </article>
        </section>

        <footer>
          BURU ENERGY CONTROL <span>·</span> Sistema inteligente de gestión energética
        </footer>
      </main>
    </div>
  )
}

export default App
