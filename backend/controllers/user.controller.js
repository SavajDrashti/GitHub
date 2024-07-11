import User from '../models/user.models.js'

export const getUserProfileAndRepos = async(req, res) => {

    const {username} = req.params;
    try {
        //60 request per hour, 5000 req per hour for authentication req
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        });
        const userProfile = await userRes.json();
       

        const repoRes = await fetch(userProfile.repos_url, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        });
        const repos = await repoRes.json();

        res.status(200).json({ userProfile, repos })

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const likeProfile = async(req, res) => {
    try {
        const {username} = req.params;

        //find authenitcated user from db by their id
        const user = await User.findById(req.user._id.toString());
        console.log(user, "auth user");

        //find user to like by their username
        const userToLike = await User.findOne({username});

        //if that user does not exist 
        if(!userToLike){
            return res.status(404).json({error: "User is not a member"});
        }
        
        //check that user already liked 
        if(user.likedProfiles.includes(userToLike.username)){
            return res.status(400).json({error: "User already liked"});
        }
        
        //if user is not already liked than update liked info
        userToLike.likedBy.push({username:user.username, avatarUrl:user.avatarUrl, likedDate:Date.now()});

        //add the user name of the user
        user.likedProfiles.push(userToLike.username);


        //to run parallaly
        await Promise.all([userToLike.save(),user.save()]);

        res.status(200).json({error: "User liked"})

    } catch (error) {
        res.status(500).json({error: error.message});
    }
} 

export const getLikes = async(req, res) => {
    try {
        console.log("Fetching likes...");
        const user = await User.findById(req.user._id.toString());

        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Likes fetched successfully.");
        res.status(200).json({likedBy:user.likedBy})
    } catch (error) {
        console.error("Error fetching likes:", error.message);
        res.status(500).json({error:error.message})
    }
}