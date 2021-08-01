import React from "react";
import { connect } from "react-redux";
import FlvJs from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (FlvJs.isSupported()) {
      if (this.player || !this.props.stream) return;

      this.player = FlvJs.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,
      });

      this.player.attachMediaElement(this.videoRef.current);

      this.player.load();
    }
  }

  render() {
    return (
      <div>
        <video
          ref={this.videoRef}
          controls
          autoPlay={false}
          style={{ width: "100%" }}
        />
        <h1>{this.props.stream?.title}</h1>
        <p>{this.props.stream?.description}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
