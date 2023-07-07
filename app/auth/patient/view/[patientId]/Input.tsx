import React from 'react'

function Input({ type = 'text', value, onChangeHandler, editingMode, placeholder }: {
    type?: 'email' | 'text',
    value: string,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
    editingMode: boolean,
    placeholder: string
}) {
    return (
        <input
            type={type}
            disabled={!editingMode}
            className={`px-[10px] w-[100%] ${editingMode ? 'placeholder:font-normal font-semibold' : ' font-normal text-grey'} text-[16px] leading-[150%]`}
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
        />
    )
}

export default Input