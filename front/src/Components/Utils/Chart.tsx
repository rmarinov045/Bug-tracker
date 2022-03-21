import React from 'react'
import { ScatterChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter } from 'recharts'
import { convertToDate } from '../../utils/util'

function Chart(props :any) {

    const tasks = props.tasks

    const dates = tasks.map((x:any) => convertToDate(x.completedOn)).map((x :string) => x.slice(4, 15))
    const dataMap :any = {}

    dates.forEach((date :any) => dataMap[date] = dataMap[date] + 1 || 1)

    const dataset = [] // good to move in module and pass as prop

    for (const key in dataMap) {
        dataset.push({ date: key, value: dataMap[key] })
    }
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart width={1000} height={1000}>
                <XAxis stroke='#475569' dataKey='date' name='Date' />
                <YAxis stroke='#475569' domain={[0, 10]} dataKey="value" name='Resolved' />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter line name='Resolved Issues' data={dataset} fill="#4caf50" />
            </ScatterChart>
        </ResponsiveContainer>
    )
}

export default Chart 