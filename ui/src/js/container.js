import {
  activateGeod,
  closeGeod,
} from './redux';

import { connect } from 'react-redux';
import Login from "./components/Login";

const mapStateToProps = (state, ownProps) => ({
  geod: state.geod,
});

const mapDispatchToProps = {
  activateGeod,
  closeGeod,
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default AppContainer;