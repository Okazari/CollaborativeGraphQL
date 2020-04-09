import React from "react";

const getExecuteResult = (execute, props) => {
  if (typeof execute === "function") return execute(props);
  return execute;
};

//default component to a function due to a mysterious bug that only happens in tests for Table.test.js but it works and render correctly... To investigate
const withProps = (execute) => (Component) => {
  const HOC = (props) => (
    <Component {...props} {...getExecuteResult(execute, props)} />
  );
  // HACK : This is a ugly hack to keep the functionnality of having a displayName + working in circular depency of tests
  setTimeout(() => (HOC.displayName = `withProps(${Component.name})`));
  return HOC;
};
export default withProps;
