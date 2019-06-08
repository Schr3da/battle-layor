import * as React from "react";
import "./Footer";

import "./Footer.less";

interface IFooterProps {
  copyright: string;
}

export const Footer = ({ copyright }: IFooterProps) => (
  <div className="footer">
    <div className="footer-wrapper">
      <span>{copyright}</span>
      <span>Github</span>
      <span>Privacy</span>
      <span>Imprint</span>
    </div>
  </div>
);
