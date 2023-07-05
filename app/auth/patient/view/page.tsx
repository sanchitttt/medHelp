'use client';
import PrimaryButton from '@/app/components/buttons'
import Checkbox from '@/app/components/reusable/inputs/Checkbox';
import config from '@/app/config';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import PatientViewCard from './PatientViewCard';
import CurrentPage from '@/app/components/CurrentPage';
import filterRecords from '@/app/utils/filterPatients';

export type SortOptions = 'Recently Updated' | 'Recently Created' | 'Default';
const sortOptions: SortOptions[] = [
    'Default',
    'Recently Created',
    'Recently Updated'
]

const getPatients = () => {
    return axios.get(`${config.BACKEND_ENDPOINT}/patients`)
}

function PatientsViewPage() {
    const [filterOptions, setFilterOptions] = useState({
        name: true,
        email: true,
        diagnosis: true,
        surgery: true,
        tags: true,
    })
    const [searchValue, setSearchValue] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showSortOption, setShowSortOptions] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState<SortOptions>('Default');
    const { data, status } = useQuery({
        queryKey: 'viewPatients',
        queryFn: getPatients
    });
    const [visibleRecords, setVisibleRecords] = useState<Record<string, string | string[]> | []>([]);

    useEffect(() => {
        document.title = 'MedHelp | Patient Records'
    },[]);

    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            //@ts-ignore
            setVisibleRecords(data.data);
        }
    }, [data]);
    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            if (searchValue.length) {
                const filteredResults = filterRecords(data.data, filterOptions, selectedSortOption, searchValue)
                //@ts-ignore
                setVisibleRecords(filteredResults)
            }
            else {
                //@ts-ignore
                setVisibleRecords(data.data);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    useEffect(() => {
        if (selectedSortOption !== 'Default') {
            
        }
    }, [selectedSortOption])

    return (
        <div className='w-[100%] h-[100%] flex flex-col justify-start'>
            <div className='mb-[25px]'>
                <CurrentPage pageName='Patients' />
            </div>
            <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='px-[10px] w-[100%] min-h-[56px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0] placeholder:font-normal font-semibold text-[16px] leading-[150%] '
                placeholder='Search for patients...'
            />
            <div className='flex justify-between w-[100%] mt-[25px]'>
                <div className='w-[100%] rounded-full'
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <PrimaryButton>{!showFilters ? "Show Filters" : "Hide Filters"}</PrimaryButton>
                </div>
                {/* <div className='w-[100%]'
                    onClick={() => setShowSortOptions(!showSortOption)}
                >
                    <PrimaryButton className='relative'>
                        Sort By
                        {showSortOption && <div className='flex flex-col shadow-v1 rounded-[10px] absolute bottom-[-120px]'>
                            {sortOptions.map((option, idx) => {
                                return <div
                                    key={option}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedSortOption(option)
                                        setShowSortOptions(false)
                                    }}
                                    className={`${option === selectedSortOption ? 'text-white bg-green' : 'bg-white text-black'} ${idx === 0 && 'rounded-t-[10px]'} ${idx === sortOptions.length - 1 && 'rounded-b-[10px]'} w-[100%] px-[10px] py-[5px] flex items-start justify-start`}
                                >
                                    {option}
                                </div>
                            })}
                        </div>
                        }
                    </PrimaryButton>
                </div> */}
            </div>
            {showFilters && <div className='flex gap-[10px] flex-col w-[100%]  bg-lightGrey py-[10px] mt-[25px] px-[15px]'>
                <div className='font-bold text-green'>Search by : </div>
                <Checkbox
                    value={filterOptions.name}
                    onChangeHandler={(e) => setFilterOptions({ ...filterOptions, name: e.target.checked })}
                    label='Name'
                />
                <Checkbox
                    value={filterOptions.email}
                    onChangeHandler={(e) => setFilterOptions({ ...filterOptions, email: e.target.checked })}
                    label='Email'
                />
                <Checkbox
                    value={filterOptions.diagnosis}
                    onChangeHandler={(e) => setFilterOptions({ ...filterOptions, diagnosis: e.target.checked })}
                    label='Diagnosis'
                />
                <Checkbox
                    value={filterOptions.surgery}
                    onChangeHandler={(e) => setFilterOptions({ ...filterOptions, surgery: e.target.checked })}
                    label='Surgery'
                />
                <Checkbox
                    value={filterOptions.tags}
                    onChangeHandler={(e) => setFilterOptions({ ...filterOptions, tags: e.target.checked })}
                    label='Tags'
                />
            </div>}
            {status === 'loading' ? <div className='grid grid-cols-2 gap-[30px] mt-[50px]'>
                <Skeleton variant='rounded' width={130} height={100} />
                <Skeleton variant='rounded' width={130} height={100} />
                <Skeleton variant='rounded' width={130} height={100} />
                <Skeleton variant='rounded' width={130} height={100} />
                <Skeleton variant='rounded' width={130} height={100} />
                <Skeleton variant='rounded' width={130} height={100} />
            </div>
                : <div className='grid grid-cols-2 gap-[30px] mt-[50px] w-[100%]'>
                    {/**@ts-ignore */}
                    {visibleRecords.length ? visibleRecords.map((item) => {
                        return <PatientViewCard
                            contact={item.contact}
                            key={item.email}
                            name={item.name}
                        />
                    }) : <div className='col-span-2 w-[100%] flex items-center justify-center text-[28px] mt-[25px] font-semi bold flex-col'>
                        No records found
                        <span className='text-[10px]'>Try chaning the search query and filters</span>
                    </div>}
                </div>
            }
        </div>
    )
}

export default PatientsViewPage