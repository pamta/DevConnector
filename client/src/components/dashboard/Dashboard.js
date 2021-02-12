import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DashboardActions } from "./DashboardActions";
import Experience from "./Experience";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  // To call the action as soon as the component loads, use this hook
  // Empty set of brackets to run just once
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {/** Show the user name if the user exists */}
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {/**Passing in props the experience array */}
          <Experience experience={profile.experience} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some information</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
