import React, { Component } from "react";
import Entry from "./Entry";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import CommentList from "./CommentList";
import { changeCategory } from "../actions/category_actions";
import CardForm from "./CardForm";
import Button from "material-ui/Button";
import Collapse from "material-ui/transitions/Collapse";
import DialogForm from "./DialogForm";
import AddIcon from "material-ui-icons/Add";

const styles = theme => ({
  error: {
    [theme.breakpoints.up("md")]: {
      marginTop: "40px"
    }
  }
});

class PostDetailsView extends Component {
  state = { expanded: false };

  componentDidMount() {
    const { post, updateCategory } = this.props;
    post && updateCategory(post.category);
  }

  handleCollapse = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { post, classes } = this.props;
    return (
      <div>
        {post && !post.deleted && (
          <div>
            <Entry entry={post} entityName={"posts"} isDetailsView />

            <div className="containerSpread marginTop50">
              <Typography
                gutterBottom
                align="center"
                color="primary"
                variant="display1"
              >
                Comments
              </Typography>
              <div className="containerRight">
                <Typography
                  gutterBottom
                  align="center"
                  color="primary"
                  variant="title"
                  className="marginRight10 marginBottom10"
                >
                  Add Comment
                </Typography>
                <Button
                  color="primary"
                  onClick={this.handleCollapse}
                  className="marginRight10 marginBottom10"
                >
                  <AddIcon />
                </Button>
              </div>
            </div>

            <Collapse in={this.state.expanded} unmountOnExit>
              <CardForm
                parentId={post.id}
                closeCollapse={() => this.handleCollapse()}
              />
            </Collapse>
            <DialogForm />
            <CommentList postId={post.id} />
          </div>
        )}
        <Typography variant="display1" align="center" className={classes.error}>
          404! Page Not Found!
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, ownProps) => ({
  post: posts.entities ? posts.entities[ownProps.match.params.postId] : null
});

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: selectedCategory =>
      dispatch(changeCategory(selectedCategory))
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PostDetailsView);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetailsView)
);
