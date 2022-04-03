import React from 'react'
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell, Legend,  } from 'recharts'
import { pieChartDataCreator } from '../../utils/chartDataConstructor'
 
function ChartByType(props :any) {

    const tasks = pieChartDataCreator(props.tasks)

    const colors = ['#1e3a8a', '#38bdf8', '#881337', '#fbbf24']

  return (
    <ResponsiveContainer>
        <PieChart width={100} height={100}>
            <Legend />
            <Pie data={tasks} nameKey='type' dataKey='value' cx='50%' cy='50%' paddingAngle={5} outerRadius={80} innerRadius={50} fill='#fafafa'>
              {tasks.map((entry :any, i :number) => <Cell key={entry.id} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        </PieChart>
    </ResponsiveContainer>
  )
}

export default ChartByType