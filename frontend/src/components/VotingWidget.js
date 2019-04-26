import React from "react";
import { connect } from "react-redux";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ThumbUp from "material-ui-icons/ThumbUp";
import ThumbDown from "material-ui-icons/ThumbDown";
import { updateVote } from "../actions/common_actions";

class VotingWidget extends React.Component {
  render() {
    const { entity, entityName, updateVoteScore } = this.props;
    return (
      <div className="containerLeft marginRight20">
        <IconButton aria-label="Thumb Up">
          <ThumbUp
            onClick={() => updateVoteScore("upVote", entity, entityName)}
          />
        </IconButton>
        <Typography type="title" className="iconText">
          {entity.voteScore}
        </Typography>
        <IconButton aria-label="Thumb Down">
          <ThumbDown
            onClick={() => updateVoteScore("downVote", entity, entityName)}
          />
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    updateVoteScore: (voteChange, entity, entityName) =>
      dispatch(updateVote(voteChange, entity, entityName))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotingWidget);
