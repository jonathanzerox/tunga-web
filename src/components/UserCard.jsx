import React from 'react'
import { Link } from 'react-router'
import Progress from './status/Progress'
import UserCardProfile from './UserCardProfile'

export default class UserCard extends React.Component {

    handleConnectRequest() {
        const { UserActions, user } = this.props;
        UserActions.createConnection({to_user: user.id});
    }

    handleConnectResponse(accepted=false) {
        const { UserActions, user } = this.props;
        UserActions.updateConnection(user.request, {accepted, responded: true});
    }

    render() {
        const { Auth, user } = this.props;

        var connection_msg = 'Send a friend request';

        if(Auth.user.is_project_owner) {
            connection_msg = 'Add to my team';

        } else if(user.is_project_owner) {
            connection_msg = 'Send request to join team';
        }

        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 card-container">
                            <UserCardProfile user={user}/>

                            <div className="row">
                                <div className="col-md-12 profile-btn">
                                    <Link to={`/member/${user.id}/`}>
                                        <button className="btn btn-default">Go to profile</button>
                                    </Link>
                                </div>
                            </div>

                            {user.can_connect?(
                                <div className="row">
                                    <div className="col-md-12 friend-req-btn">
                                        <button className="btn btn-default">{connection_msg}</button>
                                    </div>
                                </div>

                            ):(user.request?(
                                <div>
                                <div className="row">
                                    <div className="col-md-12 friend-acc-btn">
                                        <button className="btn btn-default" onClick={this.handleConnectResponse.bind(this, true)}>Accept Request</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 friend-dec-btn">
                                        <button className="btn btn-default" onClick={this.handleConnectResponse.bind(this, false)}>Decline Request</button>
                                    </div>
                                </div>
                                </div>
                            ):null)}

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
