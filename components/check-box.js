export default function Checkbox({ children, isChecked, setIsChecked }) {
  return (
    <div className="relative flex items-start mt-3 mb-3 align-middle">
      <div className="flex items-center h-5">
        <input
          id="offers"
          aria-describedby="offers-description"
          name="offers"
          type="checkbox"
          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
          checked={isChecked}
          onChange={e => {
            setIsChecked(e.target.checked)
          }}
        />
      </div>
      <div className="ml-3 text-xs font-bold flex align-middle">
        <span id="offers-description" className="text-gray-500">
          {children}
        </span>
      </div>
    </div>
  )
}
