import { convertToDate } from "./util"
import { taskData } from '../utils/api'

// Converts and returns data in required format for charts

// Scatter chart data in format => date: count of resolved tasks

interface scatterChartData {
    date: string,
    value: number
}

interface pieChartData {
    type: string,
    value: number
}

export const scatterChartDataCreator = (data :any) :scatterChartData[] => {
    const dates = data.map((x:any) => convertToDate(x.completedOn)).map((x :string) => x.slice(4, 15))
    const dataMap :any = {}

    dates.forEach((date :any) => dataMap[date] = dataMap[date] + 1 || 1)

    const dataset = []

    for (const key in dataMap) {
        dataset.push({ date: key, value: dataMap[key] })
    }

    return dataset
}

// Pie chart splitting data per type

export const pieChartDataCreator = (data :any) :pieChartData[] => {

    const types = data.map((x :taskData) => x.taskType)
    const dataMap :any = {}

    types.forEach((date :string) => dataMap[date] = dataMap[date] + 1 || 1)

    const dataset = []

    for (const key in dataMap) {
        dataset.push({ type: key, value: dataMap[key] })
    }

    return dataset
}

