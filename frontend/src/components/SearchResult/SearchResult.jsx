// React
import React from 'react';

// Cloudinary
import cloudinary from 'cloudinary-core';

// Semantic UI
import { Item, List } from 'semantic-ui-react';

// Helper Functions
import { capitalize } from '../../global/functions/regex';

// Stylesheet
import style from './SearchResult.module.css';

export const SearchResult = (props) => {

    // Cloudinary variable used for fetching images from the Cloudinary database
    const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'everythingairsoft' });

    return (
        // Item
        <Item className={style.searchResultItem} key={props.product._id}>
            {/* Image */}
            <Item.Image verticalAlign='middle' centered className={style.image} size='medium' src={cloudinaryCore.url(`${props.product._id}`)} alt={props.product.name} />
            {/* Info */}
            <Item.Content className={style.content} verticalAlign='middle'>
                <Item.Header>{props.product.name}</Item.Header>
                <List bulleted>
                    <List.Item>Category: {capitalize(props.product.mainCategory)}</List.Item>
                    <List.Item>Type: {capitalize(props.product.secondaryCategory)}</List.Item>
                    <List.Item>Material: {props.product.details.material}</List.Item>
                    <List.Item>Color: {props.product.details.color}</List.Item>
                    {
                        props.product.mainCategory === 'weapon' ? <React.Fragment>
                            <List.Item>Weight: {props.product.details.weight} grams</List.Item>
                            <List.Item>FPS Range: {props.product.details.fps}</List.Item>
                            <List.Item>Type: {capitalize(props.product.details.type)}</List.Item>
                            <List.Item>Weapon Length: {props.product.details.weaponLength}cm</List.Item>
                        </React.Fragment> : ''
                    }
                    <List.Item>Manufacturer: {props.product.details.manufacturer}</List.Item>
                </List>
                {/* Price */}
                <Item.Meta>
                    <Item.Header className={style.price} as='h2'>Price: {props.product.details.price.$numberDecimal}&#8362;</Item.Header>
                </Item.Meta>
            </Item.Content>
        </Item>
    )
}
