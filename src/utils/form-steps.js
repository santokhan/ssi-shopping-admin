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

export function formBack(to, prefix = "/properties/create") {
    const o = formSteps[formSteps.findIndex((step) => step.to === to) - 1];
    return prefix + '/' + o.to
}

export function formNext(to, prefix = "/properties/create") {
    const o = formSteps[formSteps.findIndex((step) => step.to === to) + 1];
    return prefix + '/' + o.to
}