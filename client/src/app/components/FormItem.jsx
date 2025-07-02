import React from 'react'

const FormItem = ({ label, name, type, placeholder }) => {
  return (
    <div>
        <label htmlFor={name} className="text-white block mb-2 text-sm font-medium">{label}</label>
        { (type != "textarea") ?
            <input type={type} id={name} name={name} className="bg-neutral-5/50 backdrop-blur-sm border border-neutral-4 transition-all duration-150 placeholder-neutral-3 text-neutral-1 text-sm rounded-xl block w-full p-2.5" required placeholder={placeholder} />
            :
            <textarea name={name} id={name} className="bg-neutral-5/50 backdrop-blur-sm border border-neutral-4 transition-all duration-150 placeholder-neutral-3 text-neutral-1 text-sm rounded-xl block w-full p-2.5 h-32 resize-none" placeholder={placeholder} />
        }
    </div>
  )
}

export default FormItem