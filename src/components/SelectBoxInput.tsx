type Props = {
  class: string
  label: string
  input: string
  options: string[]
}

export function SelectBoxInput(props: Props) {
  return (
    <div className={props.class}>
      <label htmlFor={props.input} className="block text-sm font-medium leading-6 text-neutral-400">
        {props.label}
      </label>
      <div className="mt-2">
        <select
          id={props.input}
          name={props.input}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-7 text-white shadow-sm ring-1 ring-inset ring-neutral-600 focus:ring-2 focus:ring-inset focus:ring-neutral-700 sm:leading-6 bg-neutral-800"
        >
          {props.options.map((option, index) => (
            <option key={index}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
