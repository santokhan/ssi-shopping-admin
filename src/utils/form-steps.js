export const formSteps = [
    {
        name: 'Description',
        to: '',
    },
    {
        name: 'Media',
        to: 'media',
    },
    {
        name: 'Location',
        to: 'location',
    },
    {
        name: 'Details',
        to: 'details',
    },
    {
        name: 'Amenities',
        to: 'amenities',
    },
];

export function formBack(to) {
    const o = formSteps[formSteps.findIndex((step) => step.to === to) - 1];
    return o.to
}

export function formNext(to) {
    const o = formSteps[formSteps.findIndex((step) => step.to === to) + 1];
    return o.to
}