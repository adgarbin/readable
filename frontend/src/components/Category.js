import React from "react";
import { connect } from "react-redux";
import { FormHelperText, FormControl } from "material-ui/Form";
import Select from "material-ui/Select";

class Category extends React.Component {
  render() {
    const { categories, selectCategory } = this.props;
    return (
      <FormControl style={{ marginBottom: "40px" }}>
        <Select native onChange={event => selectCategory(event.target.value)}>
          <option value="All">All</option>
          {categories &&
            categories.map((category, i) => (
              <option value={category.name} key={i}>
                {category.name}
              </option>
            ))}
        </Select>
        <FormHelperText>Select Post Category</FormHelperText>
      </FormControl>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: Object.values(categories)
  };
};

export default connect(mapStateToProps)(Category);
