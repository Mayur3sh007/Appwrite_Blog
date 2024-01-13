import React from 'react'

function Button({
    children,           //Its just a name it can be named anything
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",             //in most cases we keep default value for className empty  , Obv it can be overwritten but we prefer empty
    ...props                    //if user decides to add addition properties we spread those
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}> {/* & give those properties here seperately */}
        {children}
    </button>
  )
}

export default Button