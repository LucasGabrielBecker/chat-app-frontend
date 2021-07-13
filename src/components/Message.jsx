import React from 'react'

function Message({ sender, message, createdAt }) {
  const capitalize = phrase => {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1)
  }
  return (
    <div
      className={`relative mt-6 px-3 py-2 max-w-max min-h-max bg-white rounded-md shadow-lg ml-3 md:ml-4`}
    >
      <p className="text-md">{capitalize(message)}</p>
      <div className="flex justify-between">
        <span className="text-sm text-gray-300">{sender}</span>
        <span className="text-sm text-gray-300 ml-4">{createdAt}</span>
      </div>
    </div>
  )
}

export default Message
