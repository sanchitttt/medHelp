'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import config from '@/app/config';
import { PulseLoader, SyncLoader } from 'react-spinners';
import Input from './Input';
import CurrentPage from '@/app/components/CurrentPage';
import TagCapsule from '../../create/TagCapsule';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Modal } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import PatientFormInput from '@/app/components/reusable/inputs/PatientFormInput';
import validator from 'validator';
import convertBase64 from '@/app/utils/convertBase64';
import PrimaryButton from '@/app/components/buttons';

const deletedImages: string[] = [];
let tempDeletedImage = '';

function PatientViewById() {
    const path = usePathname().split('/')[4];
    const { data, status } = useQuery({
        queryKey: ['viewPatient', path],
        queryFn: () => axios.get(`${config.BACKEND_ENDPOINT}/patients/${path}`)
    })
    const [patientData, setPatientData] = useState<Record<string, string | string[]>>({});
    const [editingMode, setEditingMode] = useState(false);
    const [showEditingModal, setShowEditingModal] = useState(false);
    const [tempTag, setTempTag] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fetching, setFetching] = useState(false);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        if (data && data.data) {
            setPatientData(data.data)
        }
    }, [data]);


    const files = acceptedFiles.map(file => (
        /**@ts-expect-error */
        <li key={file.path}>
            {/**  @ts-ignore */}
            {file.path} - {file.size} bytes
        </li>
    ));

    const submitHandler = () => {
        console.log('im called2')
        const { name, email, contact, age, diagnosis, surgery, dateOfSurgery, images } = patientData;
        if (name.length && email.length && validator.isEmail(email as string) &&
            contact.length && contact.length === 10 && parseInt(age as string) >= 1 && parseInt(age as string) <= 99
            && dateOfSurgery
        ) {

            setFetching(true);
            const newlyAddedImages: string[] = [];
            const fetch = async () => {
                try {
                    console.log({
                        ...patientData,
                        images: patientData.images,
                        newlyAddedImages: newlyAddedImages,
                        imagesToBeDeleted: deletedImages
                    })
                    const response = await axios.post(`${config.BACKEND_ENDPOINT}/patients/${path}`, {
                        ...patientData,
                        images: patientData.images,
                        newlyAddedImages: newlyAddedImages,
                        imagesToBeDeleted: deletedImages
                    })
                    console.log(response)
                    setFetching(false)
                    window.alert('Patient record updated!')
                } catch (error) {

                }
            }
            if (acceptedFiles.length)
                acceptedFiles.forEach((item, idx) => {
                    const conversion = async () => {
                        const url = await convertBase64(item);
                        newlyAddedImages.push(url as string);
                    }
                    conversion().then(() => {
                        if (idx === acceptedFiles.length - 1) {
                            fetch()
                        }
                    });
                })
            else {
                fetch();
            }
        }
    };



    if (status === 'loading') {
        return <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
            <SyncLoader color="#36d7b7" />
        </div>
    }

    if (Object.keys(patientData).length)
        return (
            <>
                <CurrentPage pageName={`${patientData.name}'s details`} />
                <div className='flex items-start flex-col gap-[15px] w-[100%] mt-[30px]'>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Name</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.name as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, name: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter your name'
                                success={patientData.name.length ? true : false}
                                errorLabel='Name cant be empty'
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.name as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, name: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter your name'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Email</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.email as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, email: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter your email'
                                success={validator.isEmail(patientData.email as string)}
                                errorLabel='Invalid email'
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.email as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, email: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter your email'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Contact</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.contact as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, contact: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter your contact'
                                success={patientData.contact.length === 10}
                                errorLabel='Contact should be 10 digits'
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.contact as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, contact: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter your contact'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Age</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.age as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, age: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter your age'
                                success={+patientData.age >= 1 && +patientData.age <= 99 ? true : false}
                                errorLabel="Invalid patient age"
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.age as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, age: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter your age'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Diagnosis</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.diagnosis as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, diagnosis: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter diagnosis'
                                success={true}
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.diagnosis as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, diagnosis: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter diagnosis'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Surgery</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.surgery as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, surgery: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter the surgery'
                                success={true}
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.surgery as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, surgery: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter the surgery'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Date of surgery</div>
                        {editingMode ?
                            <PatientFormInput value={patientData.dateOfSurgery as string}
                                type='date'
                                placeholder='Enter date of surgery'
                                onChangeHandler={(e) => {
                                    setPatientData({ ...patientData, dateOfSurgery: e.target.value })
                                }}
                                success={true}
                                errorLabel='Invalid surgery'
                            /> :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <input
                                    type='date'
                                    className={`px-[10px] w-[100%] ${editingMode ? 'placeholder:font-normal font-semibold' : ' font-normal text-grey'} text-[16px] leading-[150%]`}
                                    value={patientData.dateOfSurgery}
                                    onChange={(e) => setPatientData({ ...patientData, dateOfSurgery: e.target.value })}
                                />
                            </div>
                        }
                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Tags</div>
                        {editingMode && <div className='flex items-center w-[100%] my-[10px]'>
                            <input
                                type='text'
                                placeholder='Tag value'
                                className='w-[70%]  border-[1px] py-[5px] placeholder:font-normal font-semibold text-[16px] leading-[150%] px-[5px]'
                                onChange={(e) => setTempTag(e.target.value)}
                                value={tempTag}
                            />
                            <button className='border-[1px] w-[30%] py-[5px] border-green font-semibold'
                                onClick={() => {
                                    const prevTags = [...patientData.tags as string[]]
                                    if (!prevTags.includes(tempTag)) {
                                        prevTags.push(tempTag);
                                        setPatientData({ ...patientData, tags: prevTags });
                                        setTempTag('')
                                    }
                                }}
                            >Add +</button>
                        </div>}
                        <div className='w-[100%] h-[40px] flex items-center rounded-full gap-[5px]'>
                            {Array.isArray(patientData.tags) && patientData.tags.map((tag) => {
                                return <TagCapsule
                                    removeShouldWork={editingMode}
                                    removeHandler={() => {
                                        const tags = patientData.tags as string[]
                                        const filtered = tags.filter((item) => {
                                            if (item !== tag) return item;
                                        })
                                        setPatientData({ ...patientData, tags: filtered })
                                    }}
                                    key={tag}
                                >
                                    {tag}
                                </TagCapsule>
                            })}
                        </div>
                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Assigned Doctor</div>
                        {editingMode ?
                            <PatientFormInput
                                value={patientData.assignedDoctor as string}
                                onChangeHandler={(e) => setPatientData({ ...patientData, assignedDoctor: e.target.value })}
                                editingMode={editingMode}
                                placeholder='Enter your assigned doctor'
                                success={true}
                            />
                            :
                            <div className='w-[100%] h-[40px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
                                <Input
                                    value={patientData.assignedDoctor as string}
                                    onChangeHandler={(e) => setPatientData({ ...patientData, assignedDoctor: e.target.value })}
                                    editingMode={editingMode}
                                    placeholder='Enter your assigned doctor'
                                />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col w-[100%]'>
                        <div className='text-[18px] font-bold ml-[3px]'>Images</div>
                        <div className='w-[100%] justify-center items-center flex mt-[25px]'>
                            {Array.isArray(patientData.images) && <>
                                <Carousel>
                                    {patientData.images.map((item) => {
                                        return <div key={item} className='relative'>
                                            {editingMode && <div className='flex absolute  p-[7.5px] items-center border-[1px] border-red rounded-full top-[10px] left-[50%]' style={{ transform: 'translate(-50%,0%)' }}
                                                onClick={() => {
                                                    setShowDeleteModal(true)
                                                    tempDeletedImage = item;
                                                }}
                                            >
                                                <div className='text-red'>Delete</div>
                                                <Image
                                                    className=' '
                                                    src='/CancelIcon.svg'
                                                    width={10}
                                                    height={10}
                                                    alt='Cancel'
                                                    style={{ width: '24px ' }}
                                                // onClick={removeHandler}
                                                />
                                            </div>
                                            }
                                            <Image
                                                src={item}
                                                width={300}
                                                height={200}
                                                style={{ width: '100%' }}
                                                alt={item}
                                            />
                                        </div>
                                    })}

                                </Carousel>
                            </>}
                        </div>
                        {editingMode && <><div {...getRootProps({ className: 'dropzone' })}
                            className='border-[1px] border-dashed py-[5px] px-[5px]'
                        >
                            <input {...getInputProps()} />
                            <p className='text-center'>{"Drag and drop or click here to upload patient images"}</p>
                        </div>
                            {/* <h4>Files</h4> */}
                            <ul className='text-center text-[12px]'>{files}</ul>
                        </>
                        }
                    </div>
                    {editingMode ? <div className='w-[100%] flex justify-center items-center gap-[20px] mb-[10px]'>
                        <button
                            onClick={() => {
                                window.location.reload();
                            }}
                            className={`hover:scale-[1.01] w-[90%] border-[1px] border-green text-green flex items-center justify-center  font-semibold text-[16px] h-[56px] rounded-full  `}
                        >
                            Exit editing mode
                        </button>
                        <PrimaryButton loginButtonHandler={submitHandler}>
                            {fetching ? <div className='flex flex-col items-center'>
                                <div>Please wait</div>
                                <PulseLoader size={10} color="#fff" />

                            </div> : "Update"}
                        </PrimaryButton>
                    </div> :
                        <div className='w-[100%] flex justify-center items-center mb-[10px]'>
                            <button
                                onClick={() => {
                                    setEditingMode(true)
                                    setShowEditingModal(true)
                                }}
                                className={`hover:scale-[1.01] w-[90%] border-[1px] border-green text-green flex items-center justify-center  font-semibold text-[16px] h-[56px] rounded-full  `}
                            >
                                Edit
                            </button>
                        </div>
                    }
                </div >
                {editingMode && <Modal open={showEditingModal}>
                    <div className='bg-white  w-[270px] px-[10px] rounded-[5px] border-[1px] border-green shadow-v1 py-[25px] text-center flex flex-col absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
                        <div className='text-[24px] font-bold'>{"You're in editing mode now!"}</div>
                        <div className='text-[12px] text-red my-[5px]'>{"Are you sure you want to continue?"} </div>
                        <div className='flex items-center gap-[10px] mt-[15px]'>
                            <button className=' className={`hover:scale-[1.01] w-[90%] border-[1px] border-green text-green flex items-center justify-center  font-semibold text-[16px] h-[56px] rounded-full  `}'
                                onClick={() => setShowEditingModal(false)}
                            >
                                Continue
                            </button>
                            <button className=' className={`hover:scale-[1.01] w-[90%]  bg-red text-white flex items-center justify-center  font-semibold text-[16px] h-[56px] rounded-full  `}'
                                onClick={() => {
                                    setShowEditingModal(false);
                                    setEditingMode(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
                }
                {
                    showDeleteModal && <Modal open={showDeleteModal}>
                        <div className='bg-white  w-[270px] px-[10px] rounded-[5px] border-[1px] border-green shadow-v1 py-[25px] text-center flex flex-col absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
                            <div className='text-[16px] text-red my-[5px]'>Are you sure you want to delete this image?</div>
                            <div className='flex items-center gap-[10px] mt-[15px]'>
                                <button className=' className={`hover:scale-[1.01] w-[90%] border-[1px] border-green text-green flex items-center justify-center  font-semibold text-[16px] h-[56px] rounded-full  `}'
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    {"Don't delete"}
                                </button>
                                <button className=' className={`hover:scale-[1.01] w-[90%]  bg-red text-white flex items-center justify-center  font-semibold text-[16px] h-[56px] rounded-full  `}'
                                    onClick={() => {
                                        const patientDataImages = patientData.images as string[];
                                        const filteredDeletedImages = patientDataImages.filter((item) => {
                                            if (item !== tempDeletedImage) return item;
                                        })
                                        if (tempDeletedImage.length) deletedImages.push(tempDeletedImage)
                                        tempDeletedImage = ''
                                        setPatientData({ ...patientData, images: filteredDeletedImages });
                                        setShowDeleteModal(false)
                                    }}
                                >
                                    Yes,delete
                                </button>
                            </div>
                        </div>
                    </Modal>
                }

            </>
        )
    return null;
}

export default PatientViewById