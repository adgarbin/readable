import React from "react";
import { connect } from "react-redux";
import Entry from "./Entry";
import { getSorted } from "../utils/sortUtil";

class PostList extends React.Component {
  render() {
    const { posts, selectedCategory } = this.props;

    return (
      <div>
        {posts &&
          posts.map(
            post =>
              !post.deleted &&
              (selectedCategory === undefined ||
                selectedCategory === post.category) && (
                <Entry
                  entry={post}
                  entityName={"posts"}
                  isDetailsView={false}
                  key={post.id}
                />
              )
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  const postsArray = posts.entities ? Object.values(posts.entities) : null;
  getSorted(postsArray, posts.sortBy);

  return {
    posts: postsArray
  };
};

export default connect(mapStateToProps)(PostList);
