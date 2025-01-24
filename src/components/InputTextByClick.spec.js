import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';

import InputTextByClick from './InputTextByClick';

describe('<InputTextByClick />', () => {
    const fieldName = 'name'
    const props = {
        name: fieldName,
        value: 'givenVal',
        save: spy(),
        enquireEdit: spy()
    }
    const wrapper = shallow(<InputTextByClick {...props} />);
    it('should have a h1', () => {
        expect(wrapper.find('div').text()).toContain(props.name);
        expect(wrapper.find('strong').text()).toContain(props.value);
    })
    it('should call enquireEdit()', () => {
        wrapper.find('div').at(0).simulate('click');
        //console.log(props.enquireEdit.getCall(0).args)
        expect(props.enquireEdit.getCall(0).args[0]).toEqual(fieldName);
    });
    const propsE = {
        name: fieldName,
        value: 'first',
        editMode: true,
        save: spy(),
        enquireEdit: spy()
    }
    const wrapperE = mount(<InputTextByClick {...propsE} />);
    it('should call save()', () => {
        wrapperE.find('Button').at(0).simulate('click');
        expect(propsE.save.getCall(0).args[0]).toEqual(fieldName);
        expect(propsE.save.getCall(0).args[1]).toEqual(propsE.value);

    });
})
