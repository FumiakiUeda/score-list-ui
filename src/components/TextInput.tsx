type Props = {
  col: number
  label: string
  input: string
}

export function TextInput(props: Props) {
  return (
    <div className={"sm:col-span-" + props.col}>
      <label htmlFor={props.input} className="block text-sm font-medium leading-6 text-neutral-400">
        {props.label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          id={props.input}
          name={props.input}
          className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-neutral-600 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-700 sm:leading-6 bg-neutral-800"
        />
      </div>
    </div>
  )
}
