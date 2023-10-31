import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/aflac_logo.png";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    enable: false
  };

  componentDidMount() {
    let parent = document.getElementById(`highContrast`);
    parent.addEventListener("keyup", event => {
      if (event.keyCode === 13 && document.activeElement === parent) {
        this.toggleHighContrast();
      }
   });
  }

  toggleHighContrast = () => {
    if (!this.state.enable) {
      document.documentElement.setAttribute("theme", "dark");
      this.setState({ enable: true });
    } else {
      document.documentElement.setAttribute("theme", "light");
      this.setState({ enable: false });
    }
  };
  render() {
    return (
      <div className="headerStyle">
        <a href="https://www.aflac.com/" target="_self">
          <img
            src={logo}
            aria-label="Aflac Logo"
            alt="Aflac"
            className="logo"
          />
        </a>
        <div className="navigationItemsContainer">
          
          <div className="navigationItemWrapper">
            { this.props.isCartVisible && (
              <Link className="navigationItem" to="/productSelection">
                Cart
                { this.props.cartCount > 0 ? (
                  <span className="badgeStyle">{this.props.cartCount}</span>
                ) : (
                  ""
                ) }

              </Link>
            )}
          </div>
          
          
          <div
            className="navigationItem"
            onClick={() => this.toggleHighContrast()}
            tabIndex={0}
            id="highContrast"
          >
            High Contrast
            <div className="switchPadding">
              <input
                type="checkbox"
                className="switch"
                checked={this.state.enable}
                onChange={() => this.toggleHighContrast()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartCount: state.product.cartCount,
    isCartVisible: state.header.isCartVisible
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
