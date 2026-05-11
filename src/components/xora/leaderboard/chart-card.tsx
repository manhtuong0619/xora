'use client';

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export interface ChartDatum {
  name: string;
  value: number;
  color: string;
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: ChartDatum[];
  valueFormatter?: (v: number) => string;
}

export function ChartCard({ title, subtitle, data, valueFormatter = (v) => v.toString() }: ChartCardProps) {
  const height = Math.max(180, data.length * 32 + 32);

  return (
    <div className="flex flex-col gap-3 rounded-[10px] border border-black/[0.06] bg-white p-4">
      <h3 className="text-[14px] font-semibold text-black">{title}</h3>

      {data.length === 0 ? (
        <div className="flex h-32 items-center justify-center text-[12px] text-black/45">
          No models match this filter.
        </div>
      ) : (
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ left: 0, right: 44, top: 4, bottom: 4 }}
              barCategoryGap={8}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.7)' }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v) => (typeof v === 'number' ? valueFormatter(v) : String(v ?? ''))}
                  style={{ fontSize: 11, fontWeight: 600, fill: '#000' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-[11px] text-black/45">{subtitle}</p>
    </div>
  );
}
