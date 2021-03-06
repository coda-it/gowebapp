import React from 'react';
import AlertPanel from 'client/modules/AlertPanel';
import { Loader } from 'graphen';
class Application extends React.PureComponent {
    componentDidMount() {
        const { mount } = this.props;
        mount();
    }
    render() {
        const { children, isLoaded } = this.props;
        return (React.createElement("div", { className: "application" },
            isLoaded && children,
            !isLoaded && React.createElement(Loader, null),
            React.createElement(AlertPanel, null)));
    }
}
export default Application;
//# sourceMappingURL=Application.js.map