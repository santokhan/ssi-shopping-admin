import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import InputBox from '../InputBox'
import Label from './Label'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'
import replace_ from '../../../utils/levelSplitter'
import InputError from '../InputError'

export const initialCategory = [
    {
        label: 'Category 1',
        value: "category-1"
    },
    {
        label: 'Category 2',
        value: "category-2"
    },
]

function MultipleSelect({ categories = initialCategory, label = "", error = "", className = "", onSelect }) {
    const [category, setCategory] = useState([])

    const handleSelect = (category) => {
        let c = category.filter((c) => c)
        setCategory(c);
        onSelect(c);
    }

    return (
        <InputBox className={twMerge(className)}>
            <Label>
                <span className="font-semibold capitalize">{replace_(label)}</span>
                <Listbox value={category} onChange={handleSelect} multiple as={'div'} className={"relative"}>
                    <Listbox.Button className={twMerge(
                        "w-full border rounded-lg h-12 py-3 text-start",
                        "flex items-center",
                        className
                    )}>
                        <span className="px-4 flex-1 text-ellipsis whitespace-nowrap overflow-hidden">{category.filter((c) => c).map((c) => c.value).join(', ')}</span>
                        <ChevronUpDownIcon className="w-5 h-5 flex-shrink-0" />
                    </Listbox.Button>
                    <Listbox.Options
                        as="div"
                        className="border rounded-lg absolute z-[1] w-full bg-white"
                    >
                        <Listbox.Option value="" className={twMerge(
                            "w-full px-4 py-2.5 hover:bg-gray-50",
                            "flex gap-2 items-center"
                        )}>Choose category</Listbox.Option>
                        {categories.map((c, i) => (
                            <Listbox.Option key={c.value + i} value={c} className={twMerge(
                                "w-full px-4 py-2.5 hover:bg-gray-50",
                                "flex gap-2 items-center"
                            )}>
                                {
                                    category.some(({ value }) => value == c.value) && (
                                        <CheckIcon className='w-4 h-4' />
                                    )
                                }
                                <span>{c.label}</span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </Label>
            <InputError error={error} />
        </InputBox>
    )
}

export default MultipleSelect;