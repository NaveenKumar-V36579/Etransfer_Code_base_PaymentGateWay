import React from "react";
import { connect } from "react-redux";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";

const ProgressBar = props => {
  return (
    <div>
      {props.isVisible && (
        <div className="secondaryBackground pt-3 pb-3">
          <div className="container-fluid hidden-xs-down">
            <Progress multi className="progressBarContainer">
              <Progress
                bar
                value={20 * (props.currentStep.stepNum - 1)}
                className="progressBarFinished"
              />
              <Progress
                striped={
                  props.currentStep.isCurrentStep === true ? true : false
                }
                bar
                value="20"
                className="striped-progress progress-bar-animated"
              />
            </Progress>
            <div className="mt-1">
              {props.steps.map((step, index) => (
                <div
                  className="progressStep float-left"
                  key={`progress${index}`}
                >
                  {props.currentStep.stepNum === step.stepNum ? (
                    <span>{step.stepName}</span>
                  ) : props.currentStep.stepNum < step.stepNum ? (
                    <span>{step.stepName}</span>
                  ) : (
                    <Link to={`/${step.navigateTo}`} className="progressStep">
                      {step.stepName}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isVisible: state.progressBar.isVisible,
    currentStep: state.progressBar.currentStep,
    steps: state.progressBar.steps
  };
}
export default connect(
  mapStateToProps,
  null
)(ProgressBar);
