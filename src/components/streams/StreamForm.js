import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (error && touched)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui primary button">Submit</button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};

  if (!title) errors.title = "Must have a title";

  if (!description) errors.description = "Must have a description";

  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate,
})(StreamForm);
