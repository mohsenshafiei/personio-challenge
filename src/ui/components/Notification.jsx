import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = (props) => {
  if (props.notification) {
    return (
      <div className={`notification-component --${props.notificationStyle || 'success'}`}>
        <p>{props.notificationTitle}</p>
      </div>
    );
  }
  return false;
};

Notification.propTypes = {
  notification: PropTypes.bool,
  notificationTitle: PropTypes.string,
  notificationStyle: PropTypes.string,
};

const mapStateToProps = state => ({
  notification: state.main.notification,
  notificationTitle: state.main.notificationTitle,
  notificationStyle: state.main.notificationStyle,
});
export default connect(mapStateToProps, null)(Notification);
