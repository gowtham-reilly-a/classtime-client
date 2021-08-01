import React from "react";
import { connect } from "react-redux";

import Modal from "../modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderActions = () => (
    <React.Fragment>
      <button className="ui button negative" onClick={this.onDelete}>
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );

  render() {
    if (!this.props.stream) return null;

    return (
      <Modal
        title="Delete stream"
        content={`Are you sure you want to delete: ${this.props.stream?.title}?`}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
