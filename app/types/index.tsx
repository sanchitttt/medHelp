import React from "react"

export interface ToastProps {
    title: string,
    options: Record<string, string>
}

export interface PatientFormInput {
    type?: 'number' | 'text' | 'date' | 'file',
    value: string,
    label?: string,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
    error?: boolean,
    success?: boolean,
    errorLabel?: string,
    placeholder: string
}

export interface PatientFormPayload {
    name: string,
    email: string,
    contact: string,
    age: string,
    diagnosis: string,
    surgery: string,
    dateOfSurgery: string,
    tags: string[],
    assignedDoctor: string,
    images: string[],
}