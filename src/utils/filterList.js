function filterListById(list = [], id) {
    return list.filter((property) => {
        console.log(property.id, id);
        return property.id === parseInt(id);
    });
}

export default filterListById