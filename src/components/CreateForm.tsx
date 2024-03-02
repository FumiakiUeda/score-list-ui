import Link from "next/link";
import { TextInput } from "./TextInput";

const parts = [
  "Flute",
  "Clarinet",
  "Oboe",
  "Bassoon",
];


export function CreateForm() {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <TextInput
              col={6}
              label={"曲名"}
              input={"songTitle"}
            />

            <TextInput
              col={2}
              label={"作曲者"}
              input={"composer"}
            />

            <TextInput
              col={2}
              label={"編曲者"}
              input={"arranger"}
            />

            <div className="sm:col-span-2">
              <label htmlFor="publisher" className="block text-sm font-medium leading-6 text-neutral-400">
                出版社
              </label>
              <div className="mt-2">
                <select
                  id="publisher"
                  name="publisher"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-7 text-white shadow-sm ring-1 ring-inset ring-neutral-600 focus:ring-2 focus:ring-inset focus:ring-neutral-700 sm:leading-6 bg-neutral-800"
                >
                  <option>ブレーン</option>
                  <option>ミュージック8</option>
                  <option>New Sounds Brass</option>
                </select>
              </div>
            </div>

            <TextInput
              col={6}
              label={"備考"}
              input={"note"}
            />

            <div className="sm:col-span-5">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-neutral-400">不足パート譜</legend>
                  <div className="mt-2 space-x-6 flex">
                    {parts.map((part, index) => (
                      <div className="relative flex gap-x-2" key={index}>
                        <div className="flex h-6 items-center">
                          <input
                            id={part}
                            name="missingParts[]"
                            type="checkbox"
                            className="h-4 w-4 rounded border-neutral-600 text-indigo-600 focus:ring-neutral-700"
                            value={part}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label htmlFor={part} className="font-medium text-neutral-400">
                            {part}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href={'/'}
          className="text-sm font-semibold leading-6 text-neutral-400"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          Save
        </button>
      </div>
    </form>
  )
}
