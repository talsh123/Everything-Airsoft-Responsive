import React from 'react';

// Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Images
import carousel1 from '../../global/images/carousel1.jpg';
import carousel2 from '../../global/images/carousel2.jpg';
import carousel3 from '../../global/images/carousel3.jpg';
import carousel4 from '../../global/images/carousel4.jpg';
import carousel5 from '../../global/images/carousel5.jpg';

// Semantic UI0
import { Header, Grid } from 'semantic-ui-react';

// Stylesheet
import style from './Home.module.css';

export const Home = () => {

    return (
        <React.Fragment>
            <div className={style.carouselHeader}>
                <Header as='h5' color='grey' textAlign='center'>Free shipping for orders over 150&#8362;!</Header>
            </div>
            <Carousel infiniteLoop renderThumbs={() => null} className={style.carouselContainer} autoPlay>
                <div>
                    <img className={style.carouselImage} src={carousel1} alt='Carousel' />
                </div>
                <div>
                    <img className={style.carouselImage} src={carousel2} alt='Carousel' />
                </div>
                <div>
                    <img className={style.carouselImage} src={carousel3} alt='Carousel' />
                </div>
                <div>
                    <img className={style.carouselImage} src={carousel4} alt='Carousel' />
                </div>
                <div>
                    <img className={style.carouselImage} src={carousel5} alt='Carousel' />
                </div>
            </Carousel>
            <Grid padded centered verticalAlign='middle' textAlign='center' row={1} columns={4} className={style.carouselFooter}>
                <Grid.Column computer={3} tablet={8} mobile={8} className={style.gridColumn}>
                    <Header as='h4' textAlign='center'>Free Shipping</Header>
                    <Header sub size='small' textAlign='center'>Orders over 150 &#8362;</Header>
                </Grid.Column>
                <Grid.Column computer={3} tablet={8} mobile={8} className={style.gridColumn}>
                    <Header as='h4' textAlign='center'>Price Match</Header>
                    <Header sub size='medium' textAlign='center'>Lowest price</Header>
                </Grid.Column >
                <Grid.Column computer={3} tablet={8} mobile={8} className={style.gridColumn}>
                    <Header as='h4' textAlign='center'>Top Warranty</Header>
                    <Header sub size='small' textAlign='center'>True 45 day warranty</Header>
                </Grid.Column >
                <Grid.Column computer={3} tablet={8} mobile={8} className={style.gridColumn}>
                    <Header as='h4' textAlign='center'>#1 Airsoft</Header>
                    <Header sub size='small' textAlign='center'>Retailer of the year</Header>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    );
}
