import { ChangeEventHandler } from "react";

type Props = {
  class: string;
  label: string;
  input: string;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

export function TextInput(props: Props) {
  return (
    <div className={props.class}>
      <label
        htmlFor={props.input}
        className="block text-sm font-semibold leading-6 text-neutral-400"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          id={props.input}
          name={props.input}
          className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-neutral-600 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-700 sm:leading-6 bg-neutral-800"
          placeholder={props.placeholder}
          defaultValue={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
