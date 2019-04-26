import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import uuid from "uuid/v1";

const maxRows = 20;
const rowsBody = 3;

class CommentForm extends React.Component {
  state = {
    author: "",
    body: ""
  };

  onFieldChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = isSuccess => {
    if (!isSuccess) this.props.onFormSubmit(null);
    else this.props.onFormSubmit(this.createComment());
  };

  createComment = () => {
    return {
      id: uuid(),
      author: this.state.author,
      body: this.state.body,
      parentId: this.props.postId,
      timestamp: Date.now()
    };
  };

  render() {
    return (
      <form className="formContainer" noValidate autoComplete="on">
        <Typography
          type="title"
          gutterBottom
          align="center"
          color="primary"
          variant="headline"
        >
          Add New Comment
        </Typography>
        <TextField
          id="required"
          label="Author"
          placeholder="Author"
          className="textField"
          margin="normal"
          onChange={this.onFieldChange("author")}
        />
        <TextField
          id="required"
          label="Body"
          placeholder="Body"
          className="multLineTextField"
          margin="normal"
          multiline
          rowsMax={maxRows}
          rows={rowsBody}
          onChange={this.onFieldChange("body")}
        />
        <div className="ctrlContainer">
          <Button
            color="primary"
            className="formButton"
            onClick={() => this.submitForm(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="formButton"
            onClick={() => this.submitForm(true)}
          >
            Add
          </Button>
        </div>
      </form>
    );
  }
}

export default CommentForm;
