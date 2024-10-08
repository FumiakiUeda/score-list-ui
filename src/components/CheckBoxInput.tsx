interface Props {
  class: string;
  label: string;
  input: string;
  options: string[];
  value?: Array<Value>;
}

interface Value {
  part_id: number;
}

export function CheckBoxInput(props: Props) {
  return (
    <div className={props.class}>
      <div className="mt-1 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-neutral-400">
            {props.label}
          </legend>
          <div className="mt-2 flex flex-wrap">
            {props.options.map((option, index) => (
              <div className="relative flex gap-x-2 mr-6" key={index}>
                <div className="flex h-6 items-center">
                  <input
                    id={option}
                    name={props.input + []}
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-600 text-lime-600 focus:ring-neutral-700"
                    value={index}
                    defaultChecked={
                      props.value
                        ? props.value.some((item) => item.part_id === index)
                        : false
                    }
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor={option}
                    className="font-medium text-neutral-400"
                  >
                    {option}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
