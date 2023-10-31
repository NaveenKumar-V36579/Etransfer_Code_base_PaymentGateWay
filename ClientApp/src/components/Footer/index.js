import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footerContainer pl-5 pr-5 pt-3 pb-3 mt-2">
        <div className="footerLinksContainer fullWidth">
          <p className="copyright">© 2023 AFLAC INCORPORATED</p>
          <div className="footerLinksContainer">
            <a
              href="https://www.aflac.com/about-aflac/privacy-policy.aspx"
              className="link"
              target='_blank'
            >
              Privacy Policy &amp; Notifications
            </a>
            <a
              href="https://www.aflac.com/about-aflac/terms-of-use.aspx"
              className="link"
              targret='_blank'
            >
              Terms of Use
            </a>
          </div>
        </div>
        <div className="legalContainer">
          <p className="legal pt-3">
            Individual coverage is underwritten by American Family Life
            Assurance Company of Columbus. In New York, coverage is underwritten
            by American Family Life Assurance Company of New York.
            <br />
            Worldwide Headquarters | 1932 Wynnton Road | Columbus, GA 31999
            {/* <br />
            <br />
            <sup>†</sup>One Day Pay
            <sup>SM</sup> is available for certain individual claims submitted
            online through the Aflac SmartClaim® process. Claims may be eligible
            for One Day Pay processing if submitted online through Aflac
            SmartClaim®, including all required documentation, by 3 p.m. ET.
            Documentation requirements vary by type of claim; please review
            requirements for your claim(s) carefully. Aflac SmartClaim® is
            available for claims on most individual Accident, Cancer, Hospital,
            Specified Health, and Intensive Care policies. Processing time is
            based on business days after all required documentation needed to
            render a decision is received and no further validation and/or
            research is required. Individual Company Statistic, 2018. */}
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
