// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Semantic UI
import { Image, Menu, Button, Icon, Input, Dropdown, Grid, Item } from 'semantic-ui-react';

// Images
import Logo from '../../global/images/EverythingAirsoftLogo.png';

// Stylesheets
import style from './NavBar.module.css';

// Redux
import { useSelector } from 'react-redux';

// Components
import { SearchResult } from '../SearchResult/SearchResult';

// Other
import axios from 'axios';

export const NavBar = () => {
    // Redux user state
    const user = useSelector(state => state.user);

    // products component state, result conditional rendering state
    const [products, setProducts] = useState([]);
    const [isResult, setIsResult] = useState(false);

    // A timer that resets every time the user types in the search bar 
    let timer = null;

    // Parameters: None
    // Usage: handler is being called with every change in the search bar text
    // After the user stops typing for at least 0.5s, searchProducts is called
    // This is meant to reduce the number of backend calls the website makes in order to fetch product information
    // Return: No return value
    const handler = () => {
        clearTimeout(timer);
        timer = setTimeout(searchProducts, 500);
    }

    // Parameters: None
    // Usage: searchProducts searches for a specified pattern inside a product's name
    // Return: No return value
    const searchProducts = () => {
        const text = document.getElementById('search-bar-input').value;
        if (text)
            axios.get(`/products/likeProduct/${text}`).then(data => {
                setProducts(data.data);
            })
    }

    // Parameters: None
    // Usage: generateUserOptions generates dropdown list options depending on user's type (non-verified, verified & admin)
    // Return: An array containing objects that symbolize user options
    const generateUserOptions = () => {
        // userOptions defaults to logged user due to the dropdown component not being rendered when signed out
        let userOptions = [{ key: 'settings', text: 'User Settings', icon: 'settings', active: true },
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out' }];
        if (user.isVerified)
            userOptions.push({ key: 'createCommunity', text: 'Create Community', icon: 'add user' },
                { key: 'myPurchases', text: 'My Purchases', icon: 'shopping bag' },
                { key: 'myOrders', text: 'My Orders', icon: 'book' })
        if (user.isAdmin)
            userOptions.push({ key: 'addProduct', text: 'Add Product', icon: 'inbox' },
                { key: 'manageProducts', text: 'Manage Products', icon: 'boxes' },
                { key: 'manageUsers', text: 'Manage Users', icon: 'user delete' },
                { key: 'updateProduct', text: 'Update Product', icon: 'undo' })
        return userOptions;
    }

    // Parameters: None
    // Usage: Fetch the user's search string, and render another a component which shows the search's product results 
    // Return: No return value
    const searchBarHandler = () => {
        setIsResult(true);
    }

    return (
        // NavBar Grid
        <React.Fragment>
            <Grid stackable padded>
                <Grid.Row centered className={style.rowGrid} color='black'>
                    {/* Logo Column */}
                    <Grid.Column verticalAlign='middle' floated='left' widescreen={2} largeScreen={2} computer={3} tablet={4} mobile={2}>
                        <Image as={Link} to='/' size='small' src={Logo} />
                    </Grid.Column>
                    {/* Search Bar Column */}
                    <Grid.Column verticalAlign='middle' floated='left' textAlign='left' stretched widescreen={6} largeScreen={5} computer={5} tablet={3} mobile={1}>
                        <Input id='search-bar-input' list='products' onInput={() => handler()} focus action={{ icon: 'search', circular: true, color: 'teal', onClick: () => { searchBarHandler() } }} type='text' placeholder='Search for products...' />
                        <datalist id='products'>
                            {
                                // Renders products in the datalist when the user product searching
                                products.length ? products.map(product => <option key={product._id} value={product.name}>{product.name}</option>) : ''
                            }
                        </datalist>
                    </Grid.Column>
                    {/* Sign In/ Sign Up Buttons, Contact, Community & User Options Column */}
                    <Grid.Column verticalAlign='middle' floated='right' textAlign='center' widescreen={4} largeScreen={6} computer={7} tablet={9}>
                        {
                            user._id === undefined ? <Button.Group>
                                <Button as={Link} to='/signIn' inverted className={style.buttons}>Sign In</Button>
                                <Button as={Link} to='/signUp' className={style.buttons}>Sign Up</Button>
                            </Button.Group> : ''
                        }
                        <Menu inverted borderless compact>
                            <Menu.Item as={Link} to='/communities' className={style.iconMenuItem} name='communities'>
                                <Icon color='blue' circular className={style.icons} name='users' link />
                            </Menu.Item>
                            <Menu.Item as={Link} to='/contact' className={style.iconMenuItem} name='contact'>
                                <Icon color='green' circular className={style.icons} name='phone volume' link />
                            </Menu.Item>
                            {
                                user._id !== undefined ? <Menu.Item className={style.iconMenuItem} name='user-options'>
                                    <Dropdown trigger={<span></span>} direction='left' options={generateUserOptions()} icon={<Icon color='teal' name='user' circular className={style.icons} />} />
                                </Menu.Item> : ''
                            }
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
            {/* Search Results */}
            {
                isResult ? <Item.Group relaxed link divided className={style.searchResultContainer}>
                    {
                        products.map(product => {
                            return <SearchResult key={product._id} product={product} />
                        })
                    }
                </Item.Group> : ''
            }
        </React.Fragment>
    )
}