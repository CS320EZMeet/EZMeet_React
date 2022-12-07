import React from "react";


const Help = () => {
    return (
    <div>
        <h1 className="helpHeader">How to use EzMeet?</h1>

        <div className="helpTips">
            <ol>
                <li>Welcome to EZMeet! Here’s a few tips to help you get started!</li>
                <li>First fill out all fields on the Sign Up page to create an account, then go to the Login page and sign in using the credentials you just made. If you already have an account, simply log in with your credentials on the Login page.</li> 
                <li>Once you have logged in, navigate to the User page. Here you can do the following by pressing the appropriate Edit buttons:
                    <ol type="a">
                        <li>Change your preference for showing your location</li>
                        <li>Update your activities preference</li>
                        <li>Update your location</li>
                    </ol>
                </li>
                <li>If at a later point you’d like to update your preferences, simply click the Edit buttons and change your preference as necessary.</li>
                <li>After updating your preferences, you can navigate to the Group page to begin using EZMeet!</li>
                <li>If you’d like to create a group, simply hit the “Add member” button. A link will be provided to you which you can share with intended group members on a third party application, such as social media messengers, text, email, etc. 
                    <ol type="a">
                        <li>Keep in mind other users can toggle whether or not they’d like to show their location</li>
                        <li>If at a certain point you’d like to remove a user from a group, click the X at the bottom of their icon</li>
                    </ol>
                </li>
                <li>Once other members have joined your group, click Find Places. This should suggest things for you and other members to do based on the midpoint of all your locations.</li>
                <li>Share these locations with your friends and have fun at your decided activity!</li> 
            </ol>
        </div>
    </div>)
}

export default Help;