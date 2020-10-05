// React
import React from 'react';

// Semantic UI
import { Image, Menu, Button, Icon, Input, Dropdown, Grid } from 'semantic-ui-react';

// Images
import Logo from '../../global/images/EverythingAirsoftLogo.png';

// Stylesheets
import style from './NavBar.module.css';


export const NavBar = () => {
    return (
        // NavBar Grid
        <Grid stackable padded>
            <Grid.Row centered className={style.rowGrid} color='black'>
                {/* Logo Column */}
                <Grid.Column verticalAlign='middle' floated='left' widescreen={2} largeScreen={2} computer={3} tablet={4} mobile={2}>
                    <Image href='/' size='small' src={Logo} />
                </Grid.Column>
                {/* Search Bar Column */}
                <Grid.Column verticalAlign='middle' floated='left' textAlign='left' stretched widescreen={6} largeScreen={5} computer={5} tablet={3} mobile={1}>
                    <Input focus icon={{ name: 'search', circular: true, link: true }} type='text' placeholder='Search...' />
                </Grid.Column>
                {/* Sign In/ Sign Up Buttons, Contact, Community & User Options Column */}
                <Grid.Column verticalAlign='middle' floated='right' textAlign='center' widescreen={4} largeScreen={6} computer={7} tablet={9}>
                    <Button.Group>
                        <Button href='/signIn' inverted className={style.buttons}>Sign In</Button>
                        <Button href='/signUp' className={style.buttons}>Sign Up</Button>
                    </Button.Group>
                    <Menu inverted borderless compact>
                        <Menu.Item href='/communities' className={style.iconMenuItem} name='gamepad'>
                            <Icon color='blue' circular className={style.icons} name='users' link />
                        </Menu.Item>
                        <Menu.Item href='/contact' className={style.iconMenuItem} name='gamepad'>
                            <Icon color='green' circular className={style.icons} name='phone volume' link />
                        </Menu.Item>
                        <Menu.Item className={style.iconMenuItem} name='gamepad'>
                            <Dropdown trigger={<span></span>} direction='left' options={[
                                { key: 'settings', text: 'Settings', icon: 'settings', active: true },
                                { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
                            ]} icon={<Icon color='teal' name='user' circular className={style.icons} />} />
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
            </Grid.Row>
        </Grid >
    )
}