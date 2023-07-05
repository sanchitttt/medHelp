import React from 'react'

function Checkbox(
    { label, value, onChangeHandler }: {
        label: string,
        value: boolean,
        onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
    }
) {
    return (
        <div className='flex gap-[5px] items-center justify-between w-[100px]'>
            <div className='text-[15px]'
            >{label}</div>
            <input
                type='checkbox'
                name='searchByName'
                onChange={onChangeHandler}
                checked={value}
            />
        </div>
    )
}

export default Checkbox