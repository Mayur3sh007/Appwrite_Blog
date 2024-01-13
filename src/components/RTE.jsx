import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';        

export default function RTE({name, control, label, defaultValue =""}) { //this contro we get from react-hook-form

  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller                     //we wrap it in controller so as to pass control of this component in any file we gonna import it in
    name={name || "content"}        
    control={control}                 //so that whenever we pass this to parent element it gives them this control

    render={({field: {onChange}}) => (     //if in this 'field' if anything changes tell us with rendering it

        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}

        onEditorChange={onChange}   //This onChange is the one in the begiining
        />
    )}
    />

     </div>
  )
}
