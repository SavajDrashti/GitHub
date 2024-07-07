import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos'
import Spinner from '../components/Spinner'

const HomePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState("recent");

  const user = true;

  const getUserProfileAndRepos = useCallback(async(username="SavajDrashti") => {
    setLoading(true);

     try {
      //60 request per hour, 5000 req per hour for authentication req
      const userRes = await fetch(`https://api.github.com/users/${username}`,{
        headers:{
          authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
        },
      });
      const userProfile = await userRes.json();
      setUserProfile(userProfile);

      const repoRes = await fetch(userProfile.repos_url);
      const repos = await repoRes.json();
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))  //decending recent first
      setRepos(repos);

      console.log("userprofile:", userProfile);
      console.log("repos:", repos);
      return {userProfile,repos};

     } catch (error) {
      toast.error(error.message);
     }finally{
      setLoading(false);
     }
  },[])

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos])

  const onSearch = async (e,username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const {userProfile, repos} = await getUserProfileAndRepos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  }

  const onSort = (sortType) => {
    if(sortType === "recent"){
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));    //decending recent first, this the way you can 
    }
    else if(sortType === "stars"){
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count); //decending most stars first
    }
    else if(sortType === "forks"){
      repos.sort((a,b) => b.forks_count -a.forks_count);  //decending most forks
    }

    setSortType(sortType);
    setRepos([...repos]);
  }

  return (
    <div className='flex flex-col items-center p-4'>
      <Search onSearch={onSearch}/>
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}

      <div className='flex flex-col lg:flex-row lg:justify-between lg:w-2/3 w-full mt-2 gap-4'>
        {userProfile && !loading && <ProfileInfo userProfile={userProfile}/>}
        {!loading && <Repos repos={repos}/>}
        {loading && <Spinner/>}
      </div>  
    </div>
  )
}

export default HomePage
