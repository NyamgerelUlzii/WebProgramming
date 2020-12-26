import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./TopBar.css";
import fetchModel from "../../lib/fetchModelData";


class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.match.url,
      name: "",
    };
  }
  componentDidUpdate() {
    const currUrl = this.props.match.url;
    if (this.state.url !== currUrl) {
      this.state.url = currUrl;
      if (currUrl === this.state.url) {
        this.nameHandle();
      }
    }
  }
  componentDidMount() {
    this.nameHandle();
  }
  nameHandle() {
    let arr = this.state.url.split("/");
    let userModel = window.cs142models.userModel(arr[2]);
    if (arr[1] === "users") {
      this.setState({ name: userModel.first_name });
    } else if (arr[1] === "photos") {
      this.setState({ name: "Photos of " + userModel.first_name });
    }

    // }
  }
  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Tserentogtoh
          </Typography>
          <Typography variant="h5" position="inherit">
            {this.state.name}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
