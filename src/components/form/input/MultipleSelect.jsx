import { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import InputBox from '../InputBox'
import Label from './Label'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'

export const initialCategory = [
    { id: "1", name: 'Category 1' },
    { id: "2", name: 'Category 2' },
]

function MultipleSelect({ categories = initialCategory, label = "", className = "", onSelect }) {
    const [category, setCategory] = useState([])

    const handleSelect = (category) => {
        setCategory(category);
        onSelect(category);
    }

    useEffect(() => {
        setCategory([categories[0]]);
    }, []);

    return (
        <InputBox className={twMerge(className)}>
            <Label>
                <span className="font-semibold capitalize">{label}</span>
                <Listbox value={category} onChange={handleSelect} multiple as={'div'} className={"relative"}>
                    <Listbox.Button className={twMerge(
                        "w-full border rounded-lg h-[46px] py-3 text-start",
                        "flex items-center",
                        className
                    )}>
                        <span className="px-4 flex-1 text-ellipsis whitespace-nowrap overflow-hidden">{category.map((person) => person.name).join(', ')}</span>
                        <ChevronUpDownIcon className="w-5 h-5 flex-shrink-0" />
                    </Listbox.Button>
                    <Listbox.Options
                        as="div"
                        className="border rounded-lg absolute z-[1] w-full bg-white"
                    >
                        {categories.map((person) => (
                            <Listbox.Option key={person.id} value={person} className={twMerge(
                                "w-full px-4 py-2.5 hover:bg-gray-50",
                                "flex gap-2 items-center"
                            )}>
                                {
                                    category.some(({ id }) => id == person.id) && (
                                        <CheckIcon className='w-4 h-4' />
                                    )
                                }
                                <span>{person.name}</span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </Label>
        </InputBox>
    )
}

export default MultipleSelect;