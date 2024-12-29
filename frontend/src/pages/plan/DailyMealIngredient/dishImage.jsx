/* eslint-disable react/prop-types */
import React from "react";
import { useQuery } from "react-query";
import { getImageById } from '../../../hooks/plan/dailyMealIngredients'

const DishImage = (props) => {
    const _id = props.props.dish_id;
    const { data: image } = useQuery(['getDishImage', _id],
        () => getImageById(_id))
    const dishImage = () => {
        if (image?.data[0]?.menu.data && image?.data[0]?.menu.contentType) {
            const images = `data:props/${image?.data[0]?.menu.contentType};base64,${image?.data[0]?.menu.data?.toString('base64')}`;
            return images
        } else { return `${process.env.REACT_APP_BE}/${image?.data[0]?.menu.path}`}
    }
    const imageSrc = dishImage();
    return <>
        <div className="image_ingredient">
            <img src={imageSrc} alt='lunch-image'></img>
        </div>
    </>
}

export default DishImage