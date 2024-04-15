const statusMapping = {
    true: 'Active',
    false: 'Inactive'
}

export const getStatus = (status) => {
    return statusMapping[status]
}