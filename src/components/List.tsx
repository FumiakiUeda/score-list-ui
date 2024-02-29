import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

const songs = [
  {
    id: 1,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    arranger: '-',
    publisher: 'ブレーン',
    note: '-',
    missingParts: ['Tuba', 'Horn'],
  },
  {
    id: 2,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    arranger: '-',
    publisher: 'ブレーン',
    note: '-',
    missingParts: ['Clarinet, Oboe'],
  },
  {
    id: 3,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    arranger: '-',
    publisher: 'ブレーン',
    note: '-',
    missingParts: ['Tuba'],
  },
  {
    id: 4,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    arranger: '-',
    publisher: 'ブレーン',
    note: '-',
    missingParts: ['Tuba'],
  },
  {
    id: 5,
    songTitle: 'Starry Journey',
    composer: '福田洋介',
    arranger: '-',
    publisher: 'ブレーン',
    note: '-',
    missingParts: ['Tuba'],
  },
]

export function List() {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b border-neutral-700 text-left text-neutral-400">
          <th scope="col" className="px-3 py-3">曲名</th>
          <th scope="col" className="px-3 py-3">作曲者</th>
          <th scope="col" className="px-3 py-3">編曲者</th>
          <th scope="col" className="px-3 py-3">出版社</th>
          <th scope="col" className="px-3 py-3">備考</th>
          <th scope="col" className="px-3 py-3">不足パート譜</th>
          <th scope="col" className="px-3 py-3">
            <span className="">操作</span>
          </th>
        </tr>
      </thead>
      <tbody className="">
        {songs.map((song) => (
          <tr className="border-b border-neutral-700 hover:bg-neutral-900" key={song.id}>
            <td className="px-3 py-3" key={song.id}>{song.songTitle}</td>
            <td className="px-3 py-3" key={song.id}>{song.composer}</td>
            <td className="px-3 py-3" key={song.id}>{song.arranger}</td>
            <td className="px-3 py-3" key={song.id}>{song.publisher}</td>
            <td className="px-3 py-3" key={song.id}>{song.note}</td>
            <td className="px-3 py-3" key={song.id}>{song.missingParts.join(', ')}</td>
            <td className="px-3 py-3" key={song.id}>
              <a href="#" className="px-1.5 py-1.5 text-neutral-400 hover:text-white">
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
              <a href="#" className="px-1.5 py-1.5 text-neutral-400 hover:text-white">
                <FontAwesomeIcon icon={faTrashCan} />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table >
  )
}