import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa'
import { useAuthContext } from '../context/AuthContext';

const LikeProfile = ({userProfile}) => {

  const {authUser} = useAuthContext();
  //for i cannot able to like my own profile
  const isOwnProfile = authUser?.username === userProfile.login;

    const handleLikeProfile = async() => {
        //srnd req to our endpoint
        try {
          const res = await fetch(`/api/users/like/${userProfile.login}`,{
            method : "POST",
            credentials: "include"
          });
          const data = await res.json();

          if(data.error) throw new Error(data.error);

          toast.success(data.message);

        } catch (error) {
          toast.error(error.message);
        }
    };

    if(!authUser || isOwnProfile) return null;

    //if(isOwnProfile) return null;
  return (
    <button className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
     onClick={handleLikeProfile}>
        <FaHeart size={16}/> 
        Like Profile
    </button>
  )
}

export default LikeProfile
