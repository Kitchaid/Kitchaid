/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getSpecialType } from '../../../../hooks/admin/superiorAdmin'
import {
    CreateUserDefaultFilter,
    UpdateUserDefaultFilter,
    fetchDefaultTypeByFilter,
} from "../../../../hooks/producerHooks/producerHooks";
import { useQuery } from "react-query";


export function AllergicTypes({ renderTypes, defaultTypes, allergicTypes }) {
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const [chosenTypes, setChosenTypes] = useState([]);

    useEffect(() => {
        setChosenTypes(defaultTypes);
    }, [defaultTypes]);

    // Ensure that `renderTypes` is called only when `chosenTypes` changes
    useEffect(() => {
        renderTypes(chosenTypes);
    }, [chosenTypes, renderTypes]);
    // Helper function to combine arrays, flatten, and remove duplicates
    const combineAndRemoveDuplicates = (arr1, arr2) => {
        // Concatenate the two arrays and flatten them
        const combinedArray = [...arr1, ...arr2].flat();

        // Remove duplicates using Set
        const uniqueArray = [...new Set(combinedArray)];

        return uniqueArray;
    };
    const combinedAllergicArray = combineAndRemoveDuplicates(allergicTypes, chosenTypes);
    // Toggle special type selection
    const toggleSelection = (type) => {
        setChosenTypes((prevChosenTypes) => {
            if (prevChosenTypes.includes(type)) {
                return prevChosenTypes.filter(chosenType => chosenType !== type).sort();
            } else {
                return [...prevChosenTypes, type].sort();
            }
        });
    };


    return (
        <div className="special-type-group font-size-s">
            {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => (
                <span
                    className={combinedAllergicArray.includes(type.s_type) ?
                        "special_type button_size cursor" :
                        "button_size special_type_light cursor"}
                    key={index}
                    onClick={() => toggleSelection(type.s_type)}
                >
                    {type.s_type}
                </span>
            ))}
        </div>
    );
}


// ==========Update junior default filter =================
export function AllergicTypesUpdate({ defaultTypes }) {
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const { data: defaultFilter } = useQuery("defaultTypeByFilter", fetchDefaultTypeByFilter);
    const [chosenTypesFilterJunior, setChosenTypesFilterJunior] = useState([]);

    useEffect(() => {
        setChosenTypesFilterJunior(defaultTypes.initFilterTypeJunior)
    }, [defaultTypes.initFilterTypeJunior]);
    const chosenTypesFilterSenior = defaultTypes.initFilterTypeSenior
    const { mutate: createDefaultFilter } = CreateUserDefaultFilter()
    const { mutate: updateDefaultFilter } = UpdateUserDefaultFilter()
    const handleFilter = () => {
        if (defaultFilter?.data?.Special_Filter?.length === 0) {
            createDefaultFilter({ chosenTypesFilterJunior, })
        } else {
            const _id = defaultFilter?.data?.Special_Filter[0]._id;
            updateDefaultFilter({ _id, chosenTypesFilterJunior, chosenTypesFilterSenior })
        }
    }
    //toggle default type filter
    const toggleSelectionFilter = (type) => {
        if (chosenTypesFilterJunior?.includes(type)) {
            const filterChosenTypes = chosenTypesFilterJunior.filter(
                chosenTypeFilter => chosenTypeFilter !== type
            );
            setChosenTypesFilterJunior(filterChosenTypes.sort());
        } else {
            setChosenTypesFilterJunior([...chosenTypesFilterJunior, type]);
        }
    };
    return <>
        <div className="special-type-group font-size-s">
            {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => {
                return <>
                    <span
                        className={chosenTypesFilterJunior?.includes(type.s_type) ?
                            "special_type button_size cursor" :
                            'button_size special_type_light cursor'}
                        key={index}
                        onClick={() => toggleSelectionFilter(type.s_type)}
                    >{type.s_type}</span>
                </>
            })}
        </div>
        <hr></hr>
        <button
            className="cursor stats_card mt-2 w-100"
            onClick={() => { handleFilter() }}
        >
            <span>Uppdatera</span>
        </button>
    </>
}

// ==========Update senior default filter =================
export function AllergicTypesUpdateSenior({ defaultTypes }) {
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const { data: defaultFilter } = useQuery("defaultTypeByFilter", fetchDefaultTypeByFilter);
    const [chosenTypesFilterSenior, setChosenTypesFilterSenior] = useState([]);

    useEffect(() => {
        setChosenTypesFilterSenior(defaultTypes.initFilterTypeSenior)
    }, [defaultTypes.initFilterTypeSenior])
    const { mutate: createDefaultFilter } = CreateUserDefaultFilter()
    const { mutate: updateDefaultFilter } = UpdateUserDefaultFilter()
    const chosenTypesFilterJunior = defaultTypes.initFilterTypeJunior

    const handleFilter = () => {
        if (defaultFilter?.data?.Special_Filter?.length === 0) {
            createDefaultFilter({ chosenTypesFilterSenior })
        } else {
            const _id = defaultFilter?.data?.Special_Filter[0]._id;
            updateDefaultFilter({ _id, chosenTypesFilterJunior, chosenTypesFilterSenior })
        }
    }
    //toggle default type filter
    const toggleSelectionFilter = (type) => {
        if (chosenTypesFilterSenior?.includes(type)) {
            const filterChosenTypes = chosenTypesFilterSenior.filter(
                chosenTypeFilter => chosenTypeFilter !== type
            );
            setChosenTypesFilterSenior(filterChosenTypes.sort());
        } else {
            setChosenTypesFilterSenior([...chosenTypesFilterSenior, type]);
        }
    };
    return <>
        <div className="special-type-group font-size-s">
            {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => {
                return <>
                    <span
                        className={chosenTypesFilterSenior?.includes(type.s_type) ?
                            "special_type button_size cursor" :
                            'button_size special_type_light cursor'}
                        key={index}
                        onClick={() => toggleSelectionFilter(type.s_type)}
                    >{type.s_type}</span>
                </>
            })}
        </div>senior
        <hr></hr>
        <button
            className="cursor stats_card mt-2 w-100"
            onClick={() => { handleFilter() }}
        >
            <span>Uppdatera</span>
        </button>
    </>
} 