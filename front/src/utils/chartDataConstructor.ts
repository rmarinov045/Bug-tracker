import { convertToDate } from "./util"
import { pieChartData, scatterChartData, taskData } from '../types'

// Converts and returns data in required format for charts

// Scatter chart data in format => date: count of resolved tasks

export const scatterChartDataCreator = (data: taskData[]): scatterChartData[] => {

    const dates = [...data].sort((a: any, b: any) => Number(a.completedOn) - Number(b.completedOn)).map((x: any) => convertToDate(x.completedOn)).map((x: string) => x.slice(0, 15))
    const dataMap: any = {}

    dates.forEach((date: any) => dataMap[date] = dataMap[date] + 1 || 1)

    const dataset = []

    for (const key in dataMap) {
        dataset.push({ date: key, value: dataMap[key] })
    }

    return dataset
}

// Pie chart splitting data per type

export const pieChartDataCreator = (data: taskData[]): pieChartData[] => {

    const types = data.map((x: taskData) => x.taskType)
    const dataMap: any = {}

    types.forEach((date: string) => dataMap[date] = dataMap[date] + 1 || 1)

    const dataset = []

    for (const key in dataMap) {
        dataset.push({ type: key, value: dataMap[key] })
    }

    return dataset
}

