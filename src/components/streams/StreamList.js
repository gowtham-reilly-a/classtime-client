import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderCreate() {
    if (!this.props.isSignedIn) return;

    return (
      <div style={{ textAlign: "right" }}>
        <Link to="/streams/new" className="ui button primary">
          Create stream
        </Link>
      </div>
    );
  }

  renderControls(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="ui right floated">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderControls(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            <Link to={`/streams/show/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Live Streams</h3>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
