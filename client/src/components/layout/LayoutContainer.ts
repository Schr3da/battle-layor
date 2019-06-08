import { connect } from "react-redux";
import { IStore } from "../../stores/Store";
import { Layout } from "./Layout";

const mapStateTopProps = ({ ui }: IStore) => {
  return {
    theme: ui.theme,
    copyright: ui.copyright
  };
};

const mapDispatchToProps = (_dispatch: Function) => ({});

export const LayoutContainer = connect(
  mapStateTopProps,
  mapDispatchToProps
)(Layout);
