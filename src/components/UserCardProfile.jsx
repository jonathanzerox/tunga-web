import React from 'react'
import { Link } from 'react-router'
import TagList from './TagList'
import Avatar from './Avatar'

export default class UserCardProfile extends React.Component {

    limit_bio(words) {

        if(!words) {
            return words;
        }

        let new_word = "", max = 140;

        if(words.length > max) {
          new_word = words.slice(0, max) + "...";
        } else {
          new_word = words;
        }

        return new_word;
    }


    render() {
        const { user } = this.props;

        return (
            <div className="profile_container">
                <div className="row">

                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <Avatar src={user.avatar_url} size="medium"/>
                    </div>

                    <div className="col-md-8 col-sm-8 col-xs-8 user-card-info">

                        <p className="names">
                            <Link to={`/member/${user.id}/`}>{user.display_name}</Link>
                        </p>

                        {user.profile ? (
                            <p className="location">{user.profile.city ? user.profile.city + "," : null} {user.profile.country_name}</p>
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

                <div className="skills_bio_container">
                    {user.profile?(
                        <div> {/* This div is kindof like a patch div - because expressions should be wrapped in containers/components(i suppose)  */}
                        {user.profile.skills.length?(
                            <div className="row">
                                <div className="col-md-1 col-sm-1 col-xs-1 icon_tag">
                                    <i className="fa fa-tags"></i>
                                </div>

                                <div className="col-md-10 col-sm-10 col-xs-10">
                                    <p className="languages">
                                        <TagList tags={user.profile.skills} max={3} link={`/member/${user.id}/`}/>
                                    </p>
                                </div>
                            </div>
                        ):null}

                        {user.profile.bio?(
                            <div className="row">
                                <div className="col-md-1 col-sm-1 col-xs-1">
                                    <i className="fa fa-user"></i> 
                                </div>
                                <div className="col-md-10 col-sm-10 col-xs-10">
                                    <p>{this.limit_bio(user.profile.bio)}
                                    {this.limit_bio(user.profile.bio).length > 140?
                                        <Link to={`/member/${user.id}/`}> read more</Link> : null}</p>
                                </div>
                            </div>
                        ):null}
                        </div>
                    ):null}
                </div>
            </div>
        );
    }
}
