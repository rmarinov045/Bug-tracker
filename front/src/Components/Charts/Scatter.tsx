import React from 'react'
import { ScatterChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter } from 'recharts'
import { taskData } from '../../types'
import { scatterChartDataCreator } from '../../utils/chartDataConstructor'

function Chart(props :{tasks: taskData[]}) {

    const tasks = scatterChartDataCreator(props.tasks)
    
    return (
        props.tasks.length > 0 ? 
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart width={1000} height={1000}>
                <XAxis stroke='#475569' dataKey='date' name='Date' />
                <YAxis stroke='#475569' domain={[0, 10]} dataKey="value" name='Resolved' />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter line name='Resolved Issues' data={tasks} fill="#4caf50" />
            </ScatterChart>
        </ResponsiveContainer> : <></>
    )
}

export default Chart 