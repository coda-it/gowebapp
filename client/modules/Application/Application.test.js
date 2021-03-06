import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import Application from './Application';
describe('Application', () => {
    it('should render with loader', () => {
        const component = shallow(React.createElement(Application, { isLoaded: false, mount: _.noop }, "Content"));
        expect(component).toMatchSnapshot();
    });
    it('should render with children', () => {
        const component = shallow(React.createElement(Application, { isLoaded: true, mount: _.noop },
            React.createElement("p", null, "Some content")));
        expect(component).toMatchSnapshot();
    });
});
//# sourceMappingURL=Application.test.js.map