import React from 'react'

function ProjectModal({ project }: { project: {name: string, id: string }}) {

    return (
        <div className='absolute top-2 rounded -right-0 py-2 px-4 mr-1 bg-blue-900 font-bold text-xs text-white'>
            <p>
                Current project: {project.name}
            </p>
        </div>
    )
}

export default ProjectModal