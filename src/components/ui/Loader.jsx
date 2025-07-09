const Loader = ({ size = 'medium' }) => {
  const sizeClass = 
    size === 'small' ? 'w-4 h-4 border-2' 
    : size === 'large' ? 'w-12 h-12 border-4'
    : 'w-8 h-8 border-3'

  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className={`${sizeClass} rounded-full border-gray-300 dark:border-gray-700 border-t-primary-500 animate-spin`}
      ></div>
    </div>
  )
}

export default Loader