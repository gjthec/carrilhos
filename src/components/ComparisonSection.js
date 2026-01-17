import React, { useMemo, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import {
  HiArrowDownRight,
  HiArrowTrendingUp,
  HiArrowUpRight,
  HiBuildingStorefront,
  HiCheckCircle,
  HiShoppingCart,
  HiSquares2X2
} from 'react-icons/hi2';
import { SCENARIOS } from '../constants';
import './ComparisonSection.css';

const useChartPaths = (data) => {
  return useMemo(() => {
    const width = 320;
    const height = 160;
    const padding = 24;
    const valuesBefore = data.map((item) => item.before);
    const valuesAfter = data.map((item) => item.after);
    const allValues = [...valuesBefore, ...valuesAfter];
    const maxValue = Math.max(...allValues) * 1.1;
    const minValue = Math.min(...allValues) * 0.9;
    const range = maxValue - minValue || 1;

    const scaleX = (index) =>
      padding + (index / (data.length - 1)) * (width - padding * 2);
    const scaleY = (value) =>
      height - padding - ((value - minValue) / range) * (height - padding * 2);

    const buildPath = (values) => {
      const line = values
        .map((value, index) => `${index === 0 ? 'M' : 'L'} ${scaleX(index)} ${scaleY(value)}`)
        .join(' ');
      const area = `${line} L ${scaleX(values.length - 1)} ${height - padding} L ${scaleX(0)} ${height - padding} Z`;
      return { line, area };
    };

    return {
      width,
      height,
      padding,
      before: buildPath(valuesBefore),
      after: buildPath(valuesAfter),
      ticks: Array.from({ length: 4 }, (_, index) =>
        padding + (index / 3) * (height - padding * 2)
      )
    };
  }, [data]);
};

const ComparisonSection = () => {
  const [activeScenario, setActiveScenario] = useState('own-store');
  const [isAfter, setIsAfter] = useState(false);

  const currentData = SCENARIOS[activeScenario];
  const chart = useChartPaths(currentData.chartData);

  return (
    <section className="comparison ui-section reveal" id="comparativo">
      <div className="container">
        <div className="comparison-grid">
          <div className="comparison-content">
            <div className="section-tag ui-badge">
              <HiArrowTrendingUp size={16} />
              Resultados comprovados
            </div>

            <h2 className="comparison-title">
              Transformação no e-commerce:
              <span className="comparison-title-highlight"> antes e depois da Carrilhos</span>
            </h2>

            <p className="comparison-description">
              Ajustes estratégicos em tráfego, catálogo, precificação e operação. Transformamos dados em
              rotina de gestão para aumentar a conversão e proteger a margem.
            </p>

            <ul className="comparison-list">
              {[
                'Mais conversão com a mesma verba de tráfego',
                'Mais margem de lucro por pedido aprovado',
                'Operação previsível, com metas claras'
              ].map((item) => (
                <li key={item} className="comparison-list-item">
                  <HiCheckCircle size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="comparison-actions">
              <button
                className="comparison-action comparison-action--primary ui-button"
                type="button"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Simular meu antes e depois
                <HiArrowRight size={18} />
              </button>
              <button
                className="comparison-action comparison-action--ghost ui-button"
                type="button"
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Conhecer serviços
              </button>
            </div>
          </div>

          <div className="comparison-dashboard">
            <div className="comparison-card ui-card">
              <div className="comparison-card-header">
                <div className="comparison-tabs">
                  {[
                    { id: 'own-store', label: 'Loja própria', icon: HiBuildingStorefront },
                    { id: 'marketplace', label: 'Marketplace', icon: HiShoppingCart },
                    { id: 'hybrid', label: 'Híbrido', icon: HiSquares2X2 }
                  ].map((scen) => {
                    const Icon = scen.icon;
                    return (
                      <button
                        key={scen.id}
                        type="button"
                        onClick={() => setActiveScenario(scen.id)}
                        className={`comparison-tab ui-button ${activeScenario === scen.id ? 'active' : ''}`}
                      >
                        <Icon size={14} />
                        <span>{scen.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="comparison-toggle">
                  <button
                    type="button"
                    className={`comparison-toggle-label ui-button ${!isAfter ? 'active' : ''}`}
                    onClick={() => setIsAfter(false)}
                  >
                    Sem Carrilhos
                  </button>
                  <button
                    type="button"
                    className={`comparison-toggle-track ui-button ${isAfter ? 'active' : ''}`}
                    role="switch"
                    aria-checked={isAfter}
                    onClick={() => setIsAfter((prev) => !prev)}
                  >
                    <span className="comparison-toggle-thumb" />
                  </button>
                  <button
                    type="button"
                    className={`comparison-toggle-label ui-button ${isAfter ? 'active' : ''}`}
                    onClick={() => setIsAfter(true)}
                  >
                    Com Carrilhos
                  </button>
                </div>
              </div>

              <div className="comparison-card-body">
                <div className="comparison-kpis">
                  {currentData.kpis.map((kpi) => {
                    const isPositive =
                      (kpi.trend === 'up' && !kpi.isInverse) ||
                      (kpi.trend === 'down' && kpi.isInverse);

                    return (
                      <div key={kpi.id} className="comparison-kpi ui-card hover-lift">
                        <div className="comparison-kpi-header">
                          <span>{kpi.label}</span>
                          {isAfter && (
                            <span
                              className={`comparison-kpi-badge ${isPositive ? 'positive' : 'negative'}`}
                            >
                              {isPositive ? <HiArrowUpRight size={12} /> : <HiArrowDownRight size={12} />}
                              {kpi.trend === 'down' && !kpi.isInverse ? '-' : ''}
                              {kpi.change}
                            </span>
                          )}
                        </div>

                        {!isAfter ? (
                          <div className="comparison-kpi-value">{kpi.valueBefore}</div>
                        ) : (
                          <div className="comparison-kpi-compare">
                            <div className="comparison-kpi-before">
                              <span>Antes</span>
                              <strong>{kpi.valueBefore}</strong>
                            </div>
                            <div className="comparison-kpi-after">
                              <span>Depois</span>
                              <strong>{kpi.valueAfter}</strong>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="comparison-chart">
                  <div className="comparison-chart-legend">
                    <div>
                      <span className="legend-dot legend-dot--before" />
                      Sem consultoria
                    </div>
                    <div className={isAfter ? '' : 'legend-hidden'}>
                      <span className="legend-dot legend-dot--after" />
                      Com consultoria
                    </div>
                  </div>

                  <svg
                    viewBox={`0 0 ${chart.width} ${chart.height}`}
                    className="comparison-chart-svg"
                    role="img"
                    aria-label="Gráfico comparativo de desempenho"
                  >
                    <defs>
                      <linearGradient id="comparisonBefore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="comparisonAfter" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#008ef9" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#008ef9" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {chart.ticks.map((tick) => (
                      <line
                        key={tick}
                        x1={chart.padding}
                        x2={chart.width - chart.padding}
                        y1={tick}
                        y2={tick}
                        stroke="rgba(148, 163, 184, 0.12)"
                        strokeDasharray="4 4"
                      />
                    ))}

                    <path d={chart.before.area} fill="url(#comparisonBefore)" opacity={isAfter ? 0.3 : 0.6} />
                    <path d={chart.before.line} fill="none" stroke="#94a3b8" strokeWidth="2" />
                    <path
                      d={chart.after.area}
                      fill="url(#comparisonAfter)"
                      opacity={isAfter ? 0.9 : 0}
                    />
                    <path
                      d={chart.after.line}
                      fill="none"
                      stroke="#008ef9"
                      strokeWidth="3"
                      opacity={isAfter ? 1 : 0}
                    />
                  </svg>

                  <div className="comparison-chart-labels">
                    {currentData.chartData.map((item) => (
                      <span key={item.day}>{item.day}</span>
                    ))}
                  </div>
                </div>

                <p className="comparison-note">
                  Exemplo ilustrativo com base em projetos anteriores. Resultados variam conforme segmento e execução.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
