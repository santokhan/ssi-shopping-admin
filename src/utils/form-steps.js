// Dyanmic form steps
// Well tested with nodejs VSCode debugger.

const formSteps = [
    {
        name: 'Description',
        to: 'description',
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
        name: 'QR Code',
        to: 'qr-code',
    },
    {
        name: 'Amenities',
        to: 'amenities',
    },
];

function formBack(pathname,) {
    const pathList = pathname.split('/')?.filter(Boolean)
    const removed = pathList.pop()
    const idx = formSteps.findIndex(({ to }) => removed === to)
    const prevStep = formSteps[idx - 1]
    pathList.push(prevStep.to)
    return '/' + pathList.join('/')
}
// const output = formBack('/properties/create/media/')
// console.log(output)

function formNext(pathname) {
    const pathList = pathname.split('/')?.filter(Boolean)
    const removed = pathList.pop()
    const idx = formSteps.findIndex(({ to }) => removed === to)
    const prevStep = formSteps[idx + 1]
    pathList.push(prevStep.to)
    return '/' + pathList.join('/')
}
// const output = formNext('/properties/create/media/')
// console.log(output)

export { formSteps, formBack, formNext, }