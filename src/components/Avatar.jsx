import React from 'react'

export default class Avatar extends React.Component {
    render() {
        const { src, size } = this.props;
        const image = src;
        return (
            <div style={{display: 'inline-block'}}>
                {image?(
                <div className={"avatar " + (size?size:'')}>
                    <img className="img-responsive" src={image}/>
                </div>
                    ):(
                <i className={"glyphicon glyphicon-user avatar-icon " + (size?size:null)}/>
                    )}
            </div>
        );
    }
}
