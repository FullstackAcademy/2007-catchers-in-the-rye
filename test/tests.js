//where we write tests
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import {Link} from 'react-router-dom'

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
