import React from 'react';


class Like2 extends React.Component {


    render = () => {
        return (
            <React.Fragment>
                <p>
                    This page received <strong>{this.props.urlLikes} likes</strong>.
                </p>
                <p>
                    You sent it <strong>{this.props.likesSubmittedCount} likes</strong>.
                </p>
                <p>
                    You are ranked <strong>#{this.props.likesSubmittedAt+1}</strong> on the queue of people who liked this page,
                    therefore, you will start receiving rewards when it hits {(this.props.likesSubmittedAt*this.props.rewardWaitFactor)+2} likes.
                </p>
            </React.Fragment>
        );
    }

}

export default Like2 ;


