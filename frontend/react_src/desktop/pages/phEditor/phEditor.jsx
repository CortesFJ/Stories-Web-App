import React, { useState } from 'react'

import Editor from './editor'
import use_page_context from '../../../hooks/use_page_context'

const DownloadButton = ({ children, file, file_name = 'new_file.js', content_type = 'text/plain' }) => {
    return (
        <button className="px-4 py-1 text-xl rounded-md shadow-lg w-fit active:text-green-700 hover:bg-slate-400 bg-slate-200"
            onClick={() => download(file, file_name, content_type)}>
            {children}
        </button>
    )

    function download(content, file_name, content_type) {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(content)], { type: content_type });
        a.href = URL.createObjectURL(file);
        a.download = file_name;
        a.click();
    }
}


const PhEditor = ( ) => {

    const wordsData = use_page_context('phData')
    const [currWord, setCurrWord] = useState(wordsData[0])
    const [index, setIndex] = useState(0)
    const [aidsDict, setAidsDict] = useState({})
    const [end, setEnd] = useState(false)

    const change = (next) => {
        const to = index + next

        if (to < 0) {
            return
        }
        if (to == wordsData.length) {
            setEnd(true)
            return
        }

        end && setEnd(false)
        setCurrWord(wordsData[to])
        setIndex(to)
    }

    return (
        <div className='flex flex-col items-center gap-5 pt-32'>
            {end && <div>fin</div>}
            <div className='flex flex-col items-center gap-6 text-lg border rounded shadow p-14 w-96'>
                <Editor word={currWord[0]} aid={currWord[1]} aidsDict={aidsDict} setAidsDict={setAidsDict} />
                <div className='flex justify-between w-full px-5'>
                    <button className='px-3 py-1 border active:text-green-800 active:border-green-800'
                        onClick={() => change(-1)}>
                        Prev
                    </button>
                    <button className='px-3 py-1 border active:text-green-800 active:border-green-800'
                        onClick={() => change(1)}>
                        Next
                    </button>
                </div>
            </div>
            <DownloadButton file={aidsDict} file_name='ph_aids.json'>
                Download
            </DownloadButton>
        </div>
    )
}

export default PhEditor