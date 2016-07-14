import React from 'react'
import { Link } from 'react-router'
import Progress from './status/Progress'
import UserCardProfile from './UserCardProfile'
import TagList from './TagList'

export default class UserCard extends React.Component {

    handleConnectRequest() {
        const { UserActions, user } = this.props;
        UserActions.createConnection({to_user: user.id});
    }

    handleConnectResponse(accepted=false) {
        const { UserActions, user } = this.props;
        UserActions.updateConnection(user.request, {accepted, responded: true});
    }

    handleDeleteConnection() {
        const { UserActions, user, hideOnDisconnect } = this.props;
        if(user.connection) {
            UserActions.deleteConnection(user.connection.id, user, hideOnDisconnect);
        }
    }

    render() {
        const { Auth, user } = this.props;

        var connection_msg = 'Send a friend request';

        if(Auth.user.is_project_owner) {
            connection_msg = 'Add to my team';

        } else if(user.is_project_owner) {
            connection_msg = 'Send request to join team';
            remove_msg = 'Leave team';
        }

        return (
            <div className="card-container">
                <UserCardProfile user={user}/>

                <div className="row">
                    <div className="col-md-11 profile-btn">
                        <Link to={`/member/${user.id}/`}>
                            <button className="btn btn-default">Go to profile</button>
                        </Link>
                    </div>
                </div>

                {user.can_connect?(
                    <div className="row">
                        <div className="col-md-11 friend-req-btn">
                            <button className="btn btn-default">{connection_msg}</button>
                        </div>
                    </div>

                ):(user.request?(
                    <div>
                    <div className="row">
                        <div className="col-md-11 friend-acc-btn">
                            <button className="btn btn-default" onClick={this.handleConnectResponse.bind(this, true)}>Accept Request</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-11 friend-dec-btn">
                            <button className="btn btn-default" onClick={this.handleConnectResponse.bind(this, false)}>Decline Request</button>
                        </div>
                    </div>
                    </div>
                ):null)}

            </div>
        );
    }
}
