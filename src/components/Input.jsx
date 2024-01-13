import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",      //for the type of input
    className = "",     
    ...props
}, ref){        //We also have will have a reference passed from user here

    const id = useId()
    
    return (
        <div className='w-full'>

            {label && 
            <label                    //If there's a label passed then show a label with the passsed value
            className='inline-block mb-1 pl-1' 
            htmlFor={id}    //no nee for this htmlFor shit
            >
                {label}
            </label>
            }

            <input
            type={type}     //given type
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}    //extra className passed
            ref={ref}       //to where we have to pass this 
            {...props}          
            id={id}
            />
        </div>
    )
})

export default Input