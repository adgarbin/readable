import React, { Component } from "react";
import PostList from "./PostList";
import SortControl from "./SortControl";
import { connect } from "react-redux";
import { changeCategory } from "../actions/category_actions";
import Typography from "material-ui/Typography";
import CardForm from "./CardForm";
import Button from "material-ui/Button";
import Collapse from "material-ui/transitions/Collapse";
import AddIcon from "material-ui-icons/Add";
import DialogForm from "./DialogForm";

class PostListView extends Component {
  state = { expanded: false };

  componentDidMount() {
    const category = this.props.match.params.category
      ? this.props.match.params.category
      : "";
    this.props.updateCategory(category);
  }

  handleCollapse = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const selectedCategory = this.props.match.params.category;
    return (
      <div>
        <SortControl
          sortCategories={{ vote: "voteScore", date: "timestamp" }}
        />
        <div className="containerRight">
          <Typography variant="title" align="center" color="primary">
            Add Post
          </Typography>
          <Button color="primary" onClick={this.handleCollapse}>
            <AddIcon />
          </Button>
        </div>
        <Collapse in={this.state.expanded} unmountOnExit>
          <CardForm closeCollapse={() => this.handleCollapse()} />
        </Collapse>
        <PostList selectedCategory={selectedCategory} />
        <DialogForm />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: selectedCategory =>
      dispatch(changeCategory(selectedCategory))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostListView);
