import React, {useId} from 'react'


const Input  = React.forwardRef(( function Input({
    label,
    type = 'text',
    className = '',
    ...props

},ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className='block mb-1' htmlFor={id}>{label}</label>}
            <input type={type} className={` outline outline-2 outline-black/30 focus-visible:outline-sky-400 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-white duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )

}))
export default Input