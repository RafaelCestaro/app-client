
import React from 'react';
// FIX: Removed unused PolarRadiusAxis import
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RadarDataPoint } from '../../types';

interface RadarChartProps {
  data: RadarDataPoint[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  // FIX: Replaced usage of window.Recharts with directly imported components.
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#555" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <Radar name="Atleta" dataKey="athlete" stroke="#009E60" fill="#009E60" fillOpacity={0.6} />
        <Radar name="Média Posição" dataKey="positionAvg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
        <Tooltip contentStyle={{
            backgroundColor: '#1f1f1f',
            borderColor: '#333',
            color: '#fff'
        }}/>
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};