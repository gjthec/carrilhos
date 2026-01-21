export const SCENARIOS = {
  'own-store': {
    kpis: [
      {
        id: 'conversion-rate',
        label: 'Taxa de conversão',
        valueBefore: '1,2%',
        valueAfter: '2,9%',
        change: '1,7 pp',
        trend: 'up'
      },
      {
        id: 'average-ticket',
        label: 'Ticket médio',
        valueBefore: 'R$ 180',
        valueAfter: 'R$ 245',
        change: '36%',
        trend: 'up'
      },
      {
        id: 'cac',
        label: 'CAC',
        valueBefore: 'R$ 64',
        valueAfter: 'R$ 45',
        change: '30%',
        trend: 'down',
        isInverse: true
      },
      {
        id: 'margin',
        label: 'Margem média',
        valueBefore: '18%',
        valueAfter: '24%',
        change: '6 pp',
        trend: 'up'
      }
    ],
    chartData: [
      { day: 'Seg', before: 120, after: 150 },
      { day: 'Ter', before: 135, after: 165 },
      { day: 'Qua', before: 128, after: 176 },
      { day: 'Qui', before: 142, after: 190 },
      { day: 'Sex', before: 150, after: 205 },
      { day: 'Sáb', before: 160, after: 220 },
      { day: 'Dom', before: 152, after: 210 }
    ]
  },
  marketplace: {
    kpis: [
      {
        id: 'approval-rate',
        label: 'Taxa de aprovação',
        valueBefore: '72%',
        valueAfter: '88%',
        change: '16 pp',
        trend: 'up'
      },
      {
        id: 'ads-roas',
        label: 'ROAS',
        valueBefore: '2,4x',
        valueAfter: '4,1x',
        change: '70%',
        trend: 'up'
      },
      {
        id: 'returns',
        label: 'Devoluções',
        valueBefore: '9,2%',
        valueAfter: '5,1%',
        change: '45%',
        trend: 'down',
        isInverse: true
      },
      {
        id: 'profit',
        label: 'Lucro líquido',
        valueBefore: 'R$ 38k',
        valueAfter: 'R$ 62k',
        change: '63%',
        trend: 'up'
      }
    ],
    chartData: [
      { day: 'Seg', before: 90, after: 120 },
      { day: 'Ter', before: 104, after: 132 },
      { day: 'Qua', before: 98, after: 145 },
      { day: 'Qui', before: 110, after: 160 },
      { day: 'Sex', before: 118, after: 178 },
      { day: 'Sáb', before: 130, after: 190 },
      { day: 'Dom', before: 122, after: 182 }
    ]
  },
  hybrid: {
    kpis: [
      {
        id: 'repeat',
        label: 'Recompra',
        valueBefore: '14%',
        valueAfter: '26%',
        change: '12 pp',
        trend: 'up'
      },
      {
        id: 'traffic',
        label: 'Tráfego qualificado',
        valueBefore: '38k',
        valueAfter: '61k',
        change: '60%',
        trend: 'up'
      },
      {
        id: 'operational-cost',
        label: 'Custo operacional',
        valueBefore: '12%',
        valueAfter: '8%',
        change: '33%',
        trend: 'down',
        isInverse: true
      },
      {
        id: 'nps',
        label: 'NPS',
        valueBefore: '62',
        valueAfter: '78',
        change: '16 pts',
        trend: 'up'
      }
    ],
    chartData: [
      { day: 'Seg', before: 105, after: 135 },
      { day: 'Ter', before: 112, after: 148 },
      { day: 'Qua', before: 118, after: 162 },
      { day: 'Qui', before: 126, after: 176 },
      { day: 'Sex', before: 134, after: 190 },
      { day: 'Sáb', before: 140, after: 202 },
      { day: 'Dom', before: 136, after: 196 }
    ]
  }
};
