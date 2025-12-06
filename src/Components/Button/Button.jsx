import { Component } from "react";

class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button type="button" className="load-more_btn" onClick={onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
