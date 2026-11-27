
import { useState } from "react";
import "./App.css";

const menu = [
  { id: "inicio", icon: "▦", label: "Resumen general" },
  { id: "temperatura", icon: "◉", label: "Temperatura" },
  { id: "presencia", icon: "◎", label: "Presencia" },
  { id: "iluminacion", icon: "◐", label: "Iluminación" },
  { id: "consumo", icon: "ϟ", label: "Consumo eléctrico" },
  { id: "automatizaciones", icon: "⌘", label: "Automatizaciones" },
  { id: "usuarios", icon: "♙", label: "Usuarios" },
];

function MetricCard({ title, value, unit, detail, icon, color }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className="metric-title">{title}</span>
        <span className={`metric-icon ${color}`}>{icon}</span>
      </div>
      <div className="metric-value">
        {value}<small>{unit}</small>
      </div>
      <div className="metric-detail">{detail}</div>
    </article>
  );
}

function Status({ name, state }) {
  return (
    <div className="service-row">
      <span className="service-name">{name}</span>
      <span className="status pending">
        <i /> {state}
      </span>
    </div>
  );
}

function EmptyChart({ title, subtitle }) {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className="period-label">Últimas 24 horas</span>
      </div>
      <div className="empty-chart">
        <div className="chart-grid">
          <span>100</span><span>75</span><span>50</span>
          <span>25</span><span>0</span>
        </div>
        <div className="chart-message">
          <span className="chart-symbol">⌁</span>
          <strong>Esperando datos</strong>
          <p>La gráfica estará disponible cuando se reciban mediciones.</p>
        </div>
      </div>
      <div className="chart-footer">
        <span>00:00</span><span>06:00</span><span>12:00</span>
        <span>18:00</span><span>Ahora</span>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <>
      <div className="page-intro">
        <div>
          <div className="eyebrow">MONITORIZACIÓN / AULA</div>
          <h2>Resumen general</h2>
          <p>Estado energético y ambiental del espacio monitorizado.</p>
        </div>
        <div className="live-label"><i /> Sistema preparado</div>
      </div>

      <div className="metric-grid">
        <MetricCard title="Temperatura" value="--" unit="°C" detail="Sin lectura disponible" icon="°" color="purple" />
        <MetricCard title="Humedad" value="--" unit="%" detail="Sin lectura disponible" icon="≋" color="blue" />
        <MetricCard title="Presencia" value="--" unit="" detail="Esperando sensor PIR" icon="◎" color="purple" />
        <MetricCard title="Consumo eléctrico" value="--" unit="W" detail="Sin medidor conectado" icon="ϟ" color="blue" />
      </div>

      <div className="main-grid">
        <EmptyChart title="Consumo energético" subtitle="Evolución del consumo eléctrico" />
        <section className="panel system-panel">
          <div className="panel-heading">
            <div>
              <h3>Estado del sistema</h3>
              <p>Componentes de comunicación</p>
            </div>
            <span className="small-dot" />
          </div>
          <Status name="Interfaz web" state="Activa" />
          <Status name="Node-RED" state="Pendiente" />
          <Status name="Broker MQTT" state="Pendiente" />
          <Status name="ESP32" state="Pendiente" />
          <div className="system-note">
            <span>i</span>
            Los dispositivos aparecerán como conectados cuando se establezca la comunicación.
          </div>
        </section>
      </div>

      <section className="panel lower-panel">
        <div className="panel-heading">
          <div>
            <h3>Actividad reciente</h3>
            <p>Últimos eventos registrados por el sistema</p>
          </div>
        </div>
        <div className="empty-activity">
          Todavía no hay eventos registrados.
        </div>
      </section>
    </>
  );
}

function SensorPage({ type }) {
  const data = {
    temperatura: {
      title: "Temperatura y humedad",
      description: "Seguimiento de las condiciones ambientales del aula.",
      cards: [
        ["Temperatura actual", "--", "°C"],
        ["Humedad relativa", "--", "%"],
      ],
      info: "Sensor previsto: DHT22 conectado al ESP32.",
    },
    presencia: {
      title: "Detección de presencia",
      description: "Supervisión de ocupación del espacio mediante sensor PIR.",
      cards: [["Estado de presencia", "--", ""], ["Última detección", "--", ""]],
      info: "Sensor previsto: PIR conectado al ESP32.",
    },
    consumo: {
      title: "Consumo eléctrico",
      description: "Seguimiento de la energía utilizada en el espacio.",
      cards: [["Potencia actual", "--", "W"], ["Energía acumulada", "--", "kWh"]],
      info: "La medición estará disponible al incorporar el medidor eléctrico.",
    },
  }[type];

  return (
    <>
      <div className="page-intro">
        <div>
          <div className="eyebrow">MONITORIZACIÓN</div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="metric-grid two-metrics">
        {data.cards.map(([title, value, unit]) => (
          <MetricCard key={title} title={title} value={value} unit={unit} detail="Sin datos recibidos" icon="◉" color="purple" />
        ))}
      </div>
      <EmptyChart title="Historial de mediciones" subtitle="Evolución de los valores registrados" />
      <div className="info-strip"><span>i</span>{data.info}</div>
    </>
  );
}

function LightingPage() {
  const [lightOn, setLightOn] = useState(false);
  return (
    <>
      <div className="page-intro">
        <div>
          <div className="eyebrow">CONTROL DEL AULA</div>
          <h2>Iluminación</h2>
          <p>Control del circuito de iluminación de prueba.</p>
        </div>
      </div>
      <section className="panel control-panel">
        <div className="control-copy">
          <span className="control-icon">ϟ</span>
          <div>
            <h3>Iluminación principal</h3>
            <p>Control local de la luz de prueba</p>
          </div>
        </div>
        <div className="control-action">
          <span className={lightOn ? "light-state active" : "light-state"}>
            {lightOn ? "Encendida" : "Apagada"}
          </span>
          <button className={lightOn ? "toggle on" : "toggle"} onClick={() => setLightOn(!lightOn)} aria-label="Cambiar iluminación">
            <span />
          </button>
        </div>
        <div className="warning-note">
          Este interruptor es únicamente una demostración visual. Todavía no controla el relé físico.
        </div>
      </section>
    </>
  );
}

function AutomationsPage() {
  const [enabled, setEnabled] = useState([true, true]);
  const rules = [
    { title: "Apagado por ausencia", desc: "Apagar la iluminación si no se detecta presencia durante un tiempo establecido.", tag: "Presencia" },
    { title: "Control de temperatura", desc: "Supervisar la temperatura del aula y generar avisos al superar el límite configurado.", tag: "Temperatura" },
  ];
  return (
    <>
      <div className="page-intro">
        <div>
          <div className="eyebrow">GESTIÓN INTELIGENTE</div>
          <h2>Automatizaciones</h2>
          <p>Reglas previstas para optimizar el consumo energético.</p>
        </div>
      </div>
      <div className="automation-list">
        {rules.map((rule, i) => (
          <section className="panel automation-card" key={rule.title}>
            <div className="automation-copy">
              <span className="automation-icon">⌘</span>
              <div>
                <h3>{rule.title}</h3>
                <p>{rule.desc}</p>
                <span className="rule-tag">{rule.tag}</span>
              </div>
            </div>
            <button className={enabled[i] ? "toggle on" : "toggle"} onClick={() => setEnabled(old => old.map((v, j) => j === i ? !v : v))} aria-label="Activar o desactivar regla">
              <span />
            </button>
          </section>
        ))}
      </div>
      <div className="info-strip"><span>i</span>Los interruptores son de demostración; las reglas deberán configurarse en Node-RED para ejecutarse.</div>
    </>
  );
}

function UsersPage() {
  return (
    <>
      <div className="page-intro">
        <div>
          <div className="eyebrow">ADMINISTRACIÓN</div>
          <h2>Usuarios</h2>
          <p>Gestión de acceso a la plataforma.</p>
        </div>
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div><h3>Usuarios del sistema</h3><p>La gestión de cuentas todavía no está conectada.</p></div>
        </div>
        <div className="empty-activity">No hay usuarios registrados.</div>
      </section>
    </>
  );
}

export default function App() {
  const [active, setActive] = useState("inicio");
  const current = menu.find(item => item.id === active);
  const renderPage = () => {
    if (active === "inicio") return <Dashboard />;
    if (["temperatura", "presencia", "consumo"].includes(active)) return <SensorPage type={active} />;
    if (active === "iluminacion") return <LightingPage />;
    if (active === "automatizaciones") return <AutomationsPage />;
    return <UsersPage />;
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><span>B</span></div>
          <div className="brand-name">BURU <strong>ENERGY</strong><small>CONTROL SYSTEM</small></div>
        </div>
        <div className="nav-caption">PLATAFORMA</div>
        <nav className="navigation">
          {menu.map(item => (
            <button key={item.id} className={active === item.id ? "nav-item selected" : "nav-item"} onClick={() => setActive(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-status"><i /> Interfaz operativa</div>
          <div className="version">BURU ENERGY CONTROL <span>v1.0</span></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">BURU ENERGY <span>/</span> {current?.label}</div>
          <div className="topbar-right">
            <span className="environment"><i /> ENTORNO LOCAL</span>
            <div className="user-avatar">BE</div>
          </div>
        </header>
        <div className="content">
          {renderPage()}
          <footer className="footer">
            <span>BURU ENERGY CONTROL · Sistema de monitorización energética</span>
            <span>Proyecto IoT · 2026</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
