import React from 'react';
import { mount } from 'enzyme';
import Alert from './Alert';
describe('AlertPanel/Alert', () => {
    it('should render correctly', () => {
        const component = mount(React.createElement(Alert, { type: "type-class" }, "Message"));
        expect(component).toMatchSnapshot();
    });
});
//# sourceMappingURL=Alert.test.js.map