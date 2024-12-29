// export const toggleRow = (rowId,setActiveRows,selectValue,setSelectedValue) => {
//     setActiveRows((prevActiveRows) => {
//         // Check if the row is already active
//         if (prevActiveRows.includes(rowId)) {
//             // If active, remove it from the array
//             return prevActiveRows.filter((id) => id !== rowId);
//         } else {
//             // If not active, add it to the array
//             return [...prevActiveRows, rowId];
//         }
//     })
//     if(setSelectedValue === undefined) return;
//     setSelectedValue((valueArr) => {
//         const updatedValues = valueArr.filter(({ value, id }) => !(value === selectValue && id === rowId));

//         if (updatedValues.length === valueArr.length) {
//             // If the value was not found, add it
//             return [...valueArr, { value: selectValue, id: rowId }];
//         } else {
//             // If the value was found, remove it
//             return updatedValues;
//         }
//     });
// }
export const toggleRow = (rowId, setActiveRows, selectValue, setSelectedValue) => {
    setActiveRows((prevActiveRows) => {
        // Toggle logic: add or remove the row ID based on its current state
        if (prevActiveRows.includes(rowId)) {
            // If already active (hidden), remove it from the array
            return prevActiveRows.filter((id) => id !== rowId);
        } else {
            // If not active (visible), add it to the array
            return [...prevActiveRows, rowId];
        }
    });

    // Optional: handle selected values for additional logic if needed
    if (!setSelectedValue) return;

    setSelectedValue((valueArr) => {
        // Remove value if it already exists, otherwise add it
        const updatedValues = valueArr.filter(({ value, id }) => !(value === selectValue && id === rowId));
        return updatedValues.length === valueArr.length
            ? [...valueArr, { value: selectValue, id: rowId }]
            : updatedValues;
    });
};



export const userList = (data,values) => {
   return data?.map(user => {
        const userValue = values?.find(v => v._id === user.username);
    return {
        _id: user.username,
        group:user.group,
        data: userValue ? userValue : []
    };
})}

export const getAllValueFromSelect = (e,data,setSelectedOption) => {
    e.preventDefault();
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionData = selectedIndex ? data[selectedIndex - 1] : data[0];
    setSelectedOption(selectedOptionData);
}