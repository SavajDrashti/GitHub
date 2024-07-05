import React from 'react'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center p-4'>
      <Search/>
      <SortRepos/>

      <div className='flex flex-col lg:flex-row lg:justify-between lg:w-2/3 w-full mt-2 gap-4'>
        <ProfileInfo/>
        <Repos/>
      </div>  
    </div>
  )
}

export default HomePage
