/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { cleanup, render } from "@testing-library/react";
import React from "react";
import ChartByType from '../Pie'

const tasks = [{ taskName: 'testName', taskType: 'major bug', taskPriority: 'urgent', taskAuthor: 'pesho', taskDescription: 'test', id: '123', authorId: 'testPesho', project: 'testingProject' }]

afterEach(cleanup)

describe('Pie chart render and styling', () => {
    it('Should render Pie with passed tasks', async () => {
        const { container } = render(<ChartByType tasks={tasks} />)
        const chart = container.getElementsByClassName('.recharts-responsive-container')
        expect(chart).toBeTruthy()
    })
    it('Should not render Pie without tasks', async () => {
        const { container } = render(<ChartByType tasks={tasks} />)
        const chart = container.getElementsByClassName('.recharts-responsive-container')
        expect(chart).toHaveLength(0)
    })
    it('Should render a chart with specific class name', () => {
        const { container } = render(<ChartByType tasks={tasks} />)
        expect(container.firstChild).toHaveClass('recharts-responsive-container')
    })
    it('Should render a chart with 100% width and height', () => {
        const { container } :any = render(<ChartByType tasks={tasks} />)
        expect(container?.firstChild?.style.width).toEqual("100%")
        expect(container?.firstChild?.style.height).toEqual("100%")
    })
})