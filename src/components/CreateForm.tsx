import Link from "next/link";
import { TextInput } from "./TextInput";
import { SelectBoxInput } from "./SelectBoxInput";
import { CheckBoxInput } from "./CheckBoxInput";

type Props = {
  id: number;
  name: string;
  composer: string;
  arranger: string;
  publisher: number;
  note: string;
  part: { part_id: number }[];
}

const parts = [
  "Flute",
  "Clarinet",
  "Oboe",
  "Bassoon",
];

const publishers = [
  "ブレーン",
  "ミュージック8",
  "New Sounds in Brass",
];

export function CreateForm(props: Props) {
  console.log(props)
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <TextInput
              class={"sm:col-span-6"}
              label={"曲名"}
              input={"name"}
              value={props.name}
            />

            <TextInput
              class={"sm:col-span-2"}
              label={"作曲者"}
              input={"composer"}
              value={props.composer}
            />

            <TextInput
              class={"sm:col-span-2"}
              label={"編曲者"}
              input={"arranger"}
              value={props.arranger}
            />

            <SelectBoxInput
              class={"sm:col-span-2"}
              label={"出版社"}
              input={"publisher"}
              options={publishers}
              value={props.publisher}
            />

            <TextInput
              class={"sm:col-span-6"}
              label={"備考"}
              input={"note"}
              value={props.note}
            />

            <CheckBoxInput
              class={"sm:col-span-6"}
              label={"不足パート譜"}
              input={"part[]"}
              options={parts}
            />

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
          className="rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
