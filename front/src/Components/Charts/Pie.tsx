import React from 'react'
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell, Legend,  } from 'recharts'
import { taskData } from '../../types'
import { pieChartDataCreator } from '../../utils/chartDataConstructor'
 
function ChartByType(props :{tasks: taskData[]}) {

    const tasks = pieChartDataCreator(props.tasks)

    const colors = ['#1e3a8a', '#38bdf8', '#881337', '#fbbf24']

  return (
    props.tasks.length > 0 ? 
    <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={1000} height={1000}>
            <Legend />
            <Pie data={tasks} nameKey='type' dataKey='value' cx='50%' cy='50%' paddingAngle={5} outerRadius={80} innerRadius={50} fill='#fafafa'>
              {tasks.map((entry :any, i :number) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        </PieChart>
    </ResponsiveContainer> : <></>
  )
}

export default ChartByType