import React, {useId} from 'react'

function Select({
    options,
    label = '',
    className = '',
    ...props
}, ref) {

    const id = useId();

  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}    {/* Actually we dont need it here but just for sake of a uniform structure we r making this */}
        <select
        {...props}  //pass everything user has passed earlier
        id={id}
        ref={ref}       //and reference
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (                 //We put ? before map coz if there's no options and if we still map it might crash
                <option key={option} value={option}>    {/* We give key coz its repeating */}
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)     //Just like we did in input.jsx we do the same but in other way
