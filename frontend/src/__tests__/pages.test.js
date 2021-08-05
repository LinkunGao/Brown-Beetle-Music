import { shallow } from 'enzyme';
import { render, fireEvent, screen, act } from '@testing-library/react';
import LoginDialog from '../pages/LoginDialog';
import { Router } from 'react-router-dom';
import RegisterDialog from '../pages/RegisterDialog';
import MainMusic from '../pages/MainMusic';
import MvPage from '../pages/MvPage';
import { createMemoryHistory } from 'history';
import React from 'react'



it('renders the LoginDialog page', () => {

    const wrapper = shallow(<LoginDialog />);

    expect(wrapper).toContainExactlyOneMatchingElement('Modal'); 

});

it('renders the RegisterDialog page', () => {

    const wrapper = shallow(<RegisterDialog />);

    expect(wrapper).toContainExactlyOneMatchingElement('Modal');

});

it('renders the MainMusic page', () => {

    const wrapper = shallow(<MainMusic />);

    expect(screen.queryByText('Recommend User Published Music List:'));
    expect(screen.queryByText('Hello, world!')).toBeNull();

});



