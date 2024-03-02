type Props = {
  class: string
  label: string
  input: string
  options: string[]
}

export function CheckBoxInput(props: Props) {
  return (
    <div className={props.class}>
      <div className="mt-1 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-neutral-400">{props.label}</legend>
          <div className="mt-2 space-x-6 flex">
            {props.options.map((option, index) => (
              <div className="relative flex gap-x-2" key={index}>
                <div className="flex h-6 items-center">
                  <input
                    id={option}
                    name={props.input+[]}
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-600 text-indigo-600 focus:ring-neutral-700"
                    value={option}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor={option} className="font-medium text-neutral-400">
                    {option}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  )
}
