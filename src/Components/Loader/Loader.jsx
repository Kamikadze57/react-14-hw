import { Component } from "react";
import { CirclesWithBar } from "react-loader-spinner";

class Loader extends Component {
  render() {
    return (
      <div className="LoaderContainer">
        <CirclesWithBar
          height="100"
          width="100"
          color="#3f51b5"
          outerCircleColor="#3f51b5"
          innerCircleColor="#3f51b5"
          barColor="#3f51b5"
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;
