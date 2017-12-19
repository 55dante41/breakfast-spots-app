import React from "react";

export default class FilterInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        });
        this.props.onInputChanged(e.target.value);
    }

    render() {
        const { input } = this.state;
        const style = {
            "width": "95%",
            "marginTop": "5px",
            "marginLeft": "5px",
            "textAlign": "center"
        };
        return (
            <div>
                <input
                    style={style}
                    value={input}
                    onChange={(e) => { this.handleChange(e) }} />
            </div>
        );
    }
}