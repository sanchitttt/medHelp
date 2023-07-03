'use client';
import CurrentPage from '@/app/components/CurrentPage'
import PrimaryButton from '@/app/components/buttons';
import PatientFormInput from '@/app/components/reusable/inputs/PatientFormInput';
import React, { useRef, useState, useCallback } from 'react'
import validator from 'validator';
import { useDropzone } from 'react-dropzone';
import { PatientFormPayload } from '@/app/types';
import axios from 'axios';
import config from '@/app/config';
import convertBase64 from '@/app/utils/convertBase64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagCapsule from './TagCapsule';
import { PulseLoader } from 'react-spinners';
import { Modal } from '@mui/material';

interface CustomFile extends File {
    path: string
}
const initialFormData = {
    name: '',
    email: '',
    age: '',
    contact: '',
    diagnosis: '',
    surgery: '',
    dateOfSurgery: '',
    tags: [],
    assignedDoctor: '',
    images: []
}

function PatientCreateForm() {
    const [tempTag, setTempTag] = useState('');
    const [fetching, setFetching] = useState(false);
    const [patientCreated, setPatientCreated] = useState(false);
    const [formData, setFormData] = useState<PatientFormPayload>(initialFormData);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const fileRef = useRef();

    const submitHandler = () => {
        const { name, email, contact, age, diagnosis, surgery, dateOfSurgery, images } = formData;
        if (name.length && email.length && validator.isEmail(email) &&
            contact.length && contact.length === 10 && age.length > 0 && age.length < 100
            && diagnosis.length && surgery.length && dateOfSurgery
        ) {
            const urls: string[] = []

            const fetch = async () => {
                try {
                    const response = await axios.post(`${config.BACKEND_ENDPOINT}/patients/new`, {
                        ...formData,
                        images: urls
                    })
                    setFetching(false)
                    setPatientCreated(true);
                } catch (error) {
                    setFetching(false)
                    toast.error('Patient already exists', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                }
            }
            setFetching(true);
            acceptedFiles.forEach((item, idx) => {
                const conversion = async () => {
                    const url = await convertBase64(item);
                    urls.push(url as string);
                }
                conversion().then(() => {
                    if (idx === acceptedFiles.length - 1) {
                        fetch()

                    }
                });
            })
        }

    }


    const files = acceptedFiles.map(file => (
        /**@ts-expect-error */
        <li key={file.path}>
            {/**  @ts-ignore */}
            {file.path} - {file.size} bytes
        </li>
    ));


    return (
        <>
            <CurrentPage pageName='Create New Patient' />
            <div className='flex flex-col w-[100%] mt-[50px] gap-[20px] items-center'>
                <PatientFormInput value={formData.name}
                    placeholder='Enter patient name'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                    }}
                    success={formData.name.length > 3}
                    errorLabel='Name must be atleast 3 characters long'
                />
                <PatientFormInput value={formData.email}
                    placeholder='Enter patient email'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                    }}
                    success={formData.email.length && !validator.isEmail(formData.email) ? false : true}
                    errorLabel='Please enter a valid email'
                />
                <PatientFormInput value={formData.contact}
                    type="number"
                    placeholder='Enter patient contact number'
                    onChangeHandler={(e) => {
                        console.log('called')
                        setFormData({ ...formData, contact: String(e.target.value) })
                    }}
                    success={formData.contact.length && formData.contact.length === 10 ? true : false}
                    errorLabel='Contact number should be a valid phone number of 10 digits'

                />
                <PatientFormInput value={formData.age}
                    type="number"
                    placeholder='Enter patient age'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, age: e.target.value })
                    }}
                    success={formData.age.length && +formData.age > 0 && +formData.age <= 99 ? true : false}
                    errorLabel='Age should be between 1 && 99'
                />
                <PatientFormInput value={formData.diagnosis}
                    placeholder='Enter diagnosis'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, diagnosis: e.target.value })
                    }}
                    success={true}
                    errorLabel='Invalid diagnosis'
                />
                <PatientFormInput value={formData.surgery}
                    placeholder='Enter surgery'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, surgery: e.target.value })
                    }}
                    success={true}
                    errorLabel='Invalid surgery'
                />
                <PatientFormInput value={formData.dateOfSurgery}
                    type='date'
                    label='Date of surgery'
                    placeholder='Enter date of surgery'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, dateOfSurgery: e.target.value })
                    }}
                    success={true}
                    errorLabel='Invalid surgery'
                />
                <PatientFormInput value={formData.assignedDoctor}
                    placeholder='Enter doctor assigned to patient'
                    onChangeHandler={(e) => {
                        setFormData({ ...formData, assignedDoctor: e.target.value })
                    }}
                    success={true}
                />
                <div className='text-[15px] flex-flex-col w-[100%] my-[15px]'>
                    Tags
                    <div className='flex items-center w-[100%] mt-[10px]'>
                        <input
                            type='text'
                            placeholder='Tag value'
                            className='w-[70%]  border-[1px] py-[5px] placeholder:font-normal font-semibold text-[16px] leading-[150%] px-[5px]'
                            onChange={(e) => setTempTag(e.target.value)}
                            value={tempTag}
                        />
                        <button className='border-[1px] w-[30%] py-[5px] border-green font-semibold'
                            onClick={() => {
                                const prevTags = [...formData.tags]
                                if (!prevTags.includes(tempTag)) {
                                    prevTags.push(tempTag);
                                    setFormData({ ...formData, tags: prevTags });
                                    setTempTag('')
                                }
                            }}
                        >Add +</button>
                    </div>
                    <div className='flex flex-wrap mt-[15px] gap-[5px]'>
                        {formData.tags.map((tag) => {
                            return <TagCapsule
                                removeHandler={() => {
                                    const filtered = formData.tags.filter((item) => {
                                        if (item !== tag) return item;
                                    })
                                    setFormData({ ...formData, tags: filtered })
                                }}
                                key={tag}
                            >{tag}</TagCapsule>
                        })}
                    </div>
                </div>

                <div {...getRootProps({ className: 'dropzone' })}
                    className='border-[1px] border-dashed py-[5px] px-[5px]'
                >
                    <input {...getInputProps()} />
                    <p className='text-center'>{"Drag and drop or click here to upload patient images"}</p>
                </div>
                {/* <h4>Files</h4> */}
                <ul className='text-center text-[12px]'>{files}</ul>
                <div className='w-[100%] mb-[30px] flex justify-center'
                    onClick={submitHandler}
                >
                    <PrimaryButton>
                        {fetching ? <div className='flex flex-col items-center'>
                            <div>Please wait</div>
                            <PulseLoader size={10} color="#fff" />

                        </div> : "Create"}
                    </PrimaryButton>
                </div>
            </div >
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {patientCreated && <Modal open={patientCreated}>
                <div className='absolute left-[50%] top-[50%]'
                    style={{ transform: 'translate(-50%,-50%)' }}
                >
                    <div className='flex flex-col bg-white w-[250px] items-center h-[350px] justify-center gap-[30px] rounded-[10px]'>
                        <svg className='tick-svg' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                            <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                        </svg>
                        <div className='text-[24px] text-[#73AF55] font-bold'>Patient Created!</div>
                        <div className='w-[100%] flex items-center justify-center'
                            onClick={() => {
                                setFormData({ ...initialFormData })
                                setPatientCreated(false)
                            }}
                        >
                            <PrimaryButton>Okay</PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default PatientCreateForm