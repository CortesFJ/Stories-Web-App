import React, { useEffect, useState } from "react"

import HiperWord from "../../components/hiperWord"

const Editor = ({ word, aid, aidsDict, setAidsDict }) => {
    const [cAid, setCaid] = useState(word in aidsDict ? aidsDict[word] : [...aid])

    useEffect(() => setCaid(word in aidsDict ? aidsDict[word] : [...aid]), [aid])

    const getAid = (str) => {
        let curr_str = ''
        const charts = [...str]

        const aid = charts.reduce((acc, c) => {
            if (c === "'" | c === 'x') {
                curr_str && acc.push(curr_str)
                acc.push(c)
                curr_str = ''
            }
            else {
                curr_str = curr_str + c
            }
            return acc
        }, [])

        curr_str != '' &&
            aid.push(curr_str)

        setCaid(aid)

    }

    return (
        <div className='flex gap-8'>
            <div>
                <HiperWord
                    word={word}
                    phAid={cAid}
                />
                <input type="text"
                    className='w-full mt-2 '
                    // defaultValue={cAid.join('')}
                    value={cAid.join('')}
                    onChange={(e) => getAid(e.target.value)} />
            </div>
            <button className='h-10 px-3 py-1 border active:text-green-800 active:border-green-800'
                onClick={() => setAidsDict({ ...aidsDict, [word]: cAid })}
            >
                Save
            </button>
        </div>
    )
}

export default Editor