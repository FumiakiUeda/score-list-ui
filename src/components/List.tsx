export function List() {

  const value = [
    { Name: 'News', href: '/learning/news' },
    { name: 'Article', href: '/learning/news/article' },
    { name: 'Login', href: '/learning/login' },
    { name: 'Calendar', href: '#' },
  ]

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b text-left hover:bg-gray-700">
          <th scope="col" className="px-2 py-3">曲名</th>
          <th scope="col" className="px-2 py-3">作曲家</th>
          <th scope="col" className="px-2 py-3">編曲家</th>
          <th scope="col" className="px-2 py-3">出版社</th>
          <th scope="col" className="px-2 py-3">備考</th>
          <th scope="col" className="px-2 py-3">不足パート譜</th>
          <th scope="col" className="px-2 py-3">
            <span className="">操作</span>
          </th>
        </tr>
      </thead>
      <tbody className="">
        <tr className="border-b hover:bg-gray-700">
          <td className="px-2 py-3">Starry Journey</td>
          <td className="px-2 py-3">福田洋介</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">ブレーン</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">Tuba</td>
          <td className="px-2 py-3">
            <a href="#" className="ayg blh">
              Edit
            </a>
          </td>
        </tr>
        <tr className="border-b">
          <td className="px-2 py-3">Starry Journey</td>
          <td className="px-2 py-3">福田洋介</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">ブレーン</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">Tuba</td>
          <td className="px-2 py-3">
            <a href="#" className="ayg blh">
              Edit
            </a>
          </td>
        </tr>
        <tr className="border-b">
          <td className="px-2 py-3">Starry Journey</td>
          <td className="px-2 py-3">福田洋介</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">ブレーン</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">Tuba</td>
          <td className="px-2 py-3">
            <a href="#" className="ayg blh">
              Edit
            </a>
          </td>
        </tr>
        <tr className="border-b">
          <td className="px-2 py-3">Starry Journey</td>
          <td className="px-2 py-3">福田洋介</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">ブレーン</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">Tuba</td>
          <td className="px-2 py-3">
            <a href="#" className="ayg blh">
              Edit
            </a>
          </td>
        </tr>
        <tr className="border-b">
          <td className="px-2 py-3">Starry Journey</td>
          <td className="px-2 py-3">福田洋介</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">ブレーン</td>
          <td className="px-2 py-3">-</td>
          <td className="px-2 py-3">Tuba</td>
          <td className="px-2 py-3">
            <a href="#" className="ayg blh">
              Edit
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  )
}