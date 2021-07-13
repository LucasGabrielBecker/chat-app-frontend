import CircleLoader from 'react-spinners/CircleLoader'

function Loader() {
  return (
    <div className="absolute right-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4">
      <CircleLoader color="#e97f4d" size="90" />
    </div>
  )
}

export default Loader
