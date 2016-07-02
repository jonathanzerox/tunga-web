import React from 'react'
import { Link } from 'react-router'
import TagList from './TagList'
import Avatar from './Avatar'

export default class UserCardProfile extends React.Component {

    render() {
        const { user } = this.props;

        return (
            <div>
            <div className="row">

                <div className="col-md-4">
                    <Avatar src={user.avatar_url} size="medium"/>
                </div>

                <div className="col-md-8 user-card-info">

                    <p className="names">
                        <Link to={`/member/${user.id}/`}>{user.display_name}</Link>
                    </p>

                    {user.profile ? (
                        <p className="location">{user.profile.city}, {user.profile.country_name}</p>
                    ):null}

                    {!user.is_developer && user.tasks_created?(
                        <p className="tasks-completed"> 
                            {user.tasks_created} task{user.tasks_created == 1 ? null : 's'} created
                        </p>
                    ):null}

                    {user.is_developer && user.tasks_completed?(
                        <p className="tasks-completed">
                            {user.tasks_completed} task{user.tasks_completed==1?null:'s'} completed
                        </p>
                    ):null}

                    {user.is_developer && user.satisfaction?(
                        <p class="user-rating">{user.satisfaction} rating on Tunga</p>
                    ):null}
                </div>
            </div>

            {user.profile?(
                <div>
                {user.profile.skills.length?(
                    <div className="row">
                        <div className="col-md-1">
                            <i className="fa fa-tags"></i>
                        </div>

                        <div className="col-md-11">
                            <p className="languages">
                                <TagList tags={user.profile.skills} max={3} link={`/member/${user.id}/`}/>
                            </p>
                        </div>
                    </div>
                ):null}

                {user.profile.bio?(
                    <div className="row">
                        <div className="col-md-1">
                            <i className="fa fa-user"></i> 
                        </div>
                        <div className="col-md-11">
                            <p>{user.profile.bio}</p>
                        </div>
                    </div>
                ):null}
                </div>
            ):null}
            </div>
        );
    }
}
