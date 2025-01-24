import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';

import CheckBoxesByClick from './CheckBoxesByClick';

describe('<CheckBoxesByClick />', () => {
    const fieldName = 'Permissions'
    const props = {
        name: 'permsgroup',
        groupName: fieldName,
        availableOptions: [{name:'admin', value: 'admin'}],
        selectedOptions: [],
        save: spy(),
        enquireEdit: spy()
    }
    const wrapper = shallow(<CheckBoxesByClick {...props} />);
    it('should have a h1', () => {
        expect(wrapper.find('div').text()).toContain(props.groupName);
    })
    it('should call enquireEdit()', () => {
        wrapper.find('div').at(0).simulate('click');
        //console.log(props.enquireEdit.getCall(0).args)
        expect(props.enquireEdit.getCall(0).args[0]).toEqual(props.name);
    });
    const propsE = {
        name: 'permsgroup',
        groupName: fieldName,
        availableOptions: [{name:'admin', value: 'admin'}],
        selectedOptions: [],
        editMode: true,
        save: spy(),
        enquireEdit: spy()
    }
    const wrapperE = mount(<CheckBoxesByClick {...propsE} />);
    it('should call save()', () => {
        let buttons = wrapperE.find('Button');
        //console.log('BUTTONS LENGTH', buttons.length);
        buttons.at(0).simulate('click');
        buttons.at(buttons.length-1).simulate('click');
        expect(propsE.save.getCall(0).args[0]).toEqual(propsE.name);
        expect(propsE.save.getCall(0).args[1]).toEqual(['admin']);
        //console.log('calling args', propsE.save.getCall(0).args)
        //expect(propsE.save.getCall(0).args[1]).toEqual('first');

    });
})
