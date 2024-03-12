import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"

const songs = [
  {
    id: 1,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    arranger: '',
    publisher: 'ブレーン',
    note: '',
    missingParts: ['Tuba', 'Horn'],
  },
  {
    id: 2,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    publisher: 'ブレーン',
    missingParts: ['Clarinet, Oboe'],
  },
  {
    id: 3,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    publisher: 'ブレーン',
    missingParts: ['Tuba'],
  },
  {
    id: 4,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    publisher: 'ブレーン',
    missingParts: ['Tuba'],
  },
  {
    id: 5,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    publisher: 'ブレーン',
    missingParts: ['Tuba'],
  },
]

export function List() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-neautral-200 dark:border-neutral-700 text-left text-neutral-500 dark:text-neutral-400">
            <th scope="col" className="px-3 py-3">曲名</th>
            <th scope="col" className="px-3 py-3">作曲者</th>
            <th scope="col" className="px-3 py-3">編曲者</th>
            <th scope="col" className="px-3 py-3">出版社</th>
            <th scope="col" className="px-3 py-3">備考</th>
            <th scope="col" className="px-3 py-3">不足パート譜</th>
          </tr>
        </thead>
        <tbody className="">
          {songs.map((song) => (
            <tr className="border-b border-neautral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" key={song.id}>
              <td className="px-3 py-3" key={song.id}>
                <div>
                  {song.songTitle}
                </div>
                <div className="mt-2">
                  <Link
                    href={'/edit/' + song.id}
                    className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                  <a href="#" className="px-1.5 py-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </a>
                </div>
              </td>
              <td className="px-3 py-3" key={song.id}>{song.composer}</td>
              <td className="px-3 py-3" key={song.id}>{song.arranger}</td>
              <td className="px-3 py-3" key={song.id}>{song.publisher}</td>
              <td className="px-3 py-3" key={song.id}>{song.note}</td>
              <td className="px-3 py-3" key={song.id}>{song.missingParts.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table >
    </div>
  )
}