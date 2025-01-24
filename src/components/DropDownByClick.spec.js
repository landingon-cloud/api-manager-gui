import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';

import DropDownByClick from './DropDownByClick';

describe('<DropDownByClick />', () => {
    const fieldName = 'name'
    const props = {
        name: fieldName,
        options: [],
        save: spy(),
        enquireEdit: spy()
    }
    const wrapper = shallow(<DropDownByClick {...props} />);
    it('should have a h1', () => {
        expect(wrapper.find('div').text()).toContain(props.name);
    })
    it('should call enquireEdit()', () => {
        wrapper.find('div').at(0).simulate('click');
        //console.log(props.enquireEdit.getCall(0).args)
        expect(props.enquireEdit.getCall(0).args[0]).toEqual(fieldName);
    });
    const propsE = {
        name: fieldName,
        options: ['first'],
        editMode: true,
        save: spy(),
        enquireEdit: spy()
    }
    const wrapperE = mount(<DropDownByClick {...propsE} />);
    it('should call save()', () => {
        wrapperE.find('Button').at(0).simulate('click');
        expect(propsE.save.getCall(0).args[0]).toEqual(fieldName);
        expect(propsE.save.getCall(0).args[1]).toEqual('first');

    });
})
