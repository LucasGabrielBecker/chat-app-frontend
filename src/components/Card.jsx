import React from 'react'
import { ReactComponent as CameraIcon } from 'assets/camera.svg'

function Card({ user }) {
  const firstName = user?.name?.first
  const lastName = user?.name?.last
  const username = `${firstName} ${lastName}`
  return (
    <div className="fixed w-full z-10 py-3 px-4 bg-white flex align-middle shadow-md lg:shadow-xl">
      <img
        src={user?.picture?.medium}
        className="rounded-full border border-gray-600 w-12 h-12 p-0.5"
        alt="UserImage"
      />
      <div className="ml-4 h-full flex w-full justify-between align-baseline">
        <div className="">
          <p className="text-md text-gray-700">{username}</p>
          <p className="text-sm text-gray-400">Active 1h ago</p>
        </div>
        <div className="h-full">
          <CameraIcon color="#444444" className="w-7" />
        </div>
      </div>
    </div>
  )
}

export default Card
