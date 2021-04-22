import React from "react"
import {useRef, useEffect} from "react"

const TextArea = ({input, meta, defaultValue, ...props}) => {
    let ref = useRef(null)

    useEffect(() => {
        if (ref.current && ref.current.value === defaultValue) {
            let len = ref.current.value.length
            ref.current.setSelectionRange(len + 1, len + 1)
        }
    })

    return (
        <textarea {...input} {...props} ref={ref} defaultValue={defaultValue}/>
    )
}

export default TextArea