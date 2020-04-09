import React from "react";
import PropTypes from "prop-types";
import withProps from "../../withProps";
import { Flex } from "../common";

const Rows = withProps({
  direction: "column",
})(Flex);

const RowsWithPropTypes = (props) => <Rows {...props} />;

RowsWithPropTypes.propTypes = {
  /** Layout definition as used in CSSgrids. Ex: 1 0 auto 10px */
  layout: PropTypes.string,
  /** If set, elements will wrap */
  flexWrap: PropTypes.bool,
  /** Gap between elements as a CSS distance value. Ex: 2rem */
  gap: PropTypes.string,
  /** Flex property to vertical align Ex: flex-start, center...*/
  verticalAlign: PropTypes.string,
  /** Flex property to horizontal align Ex: flex-start, center...*/
  horizontalAlign: PropTypes.string,
};

export default RowsWithPropTypes;
