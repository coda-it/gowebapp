import React from 'react';
class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hide: false,
        };
    }
    componentDidMount() {
        this.showTimeout = setTimeout(() => {
            this.setState({ show: true });
        }, 2000);
        this.hideTimeout = setTimeout(() => {
            this.setState({ hide: true });
        }, 4000);
    }
    componentWillUnmount() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }
    render() {
        const { type, children } = this.props;
        const { show, hide } = this.state;
        const showClass = show ? 'show' : '';
        const hideClass = hide ? 'hide' : '';
        const classes = `alert-panel__alert alert-panel__alert--${type} ${showClass} ${hideClass}`;
        return React.createElement("div", { className: classes }, children);
    }
}
export default Alert;
//# sourceMappingURL=Alert.js.map