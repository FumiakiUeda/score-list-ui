import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  total: number
}

export function Pagenation(props: Props) {
  const perPage = 10
  const page = 1
  const startIndex = (page - 1) * perPage + 1;
  const endIndex = Math.min(startIndex + perPage - 1, props.total);

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-neutral-950 dark:hover:text-white-white"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-neutral-950 dark:hover:text-white-white"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-400">
            <span className="font-medium">{props.total}</span>件中<span className="font-medium">{startIndex}</span>～<span className="font-medium">{endIndex}</span>件を表示
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-neutral-400 hover:text-neutral-950 dark:hover:text-white-white focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold dark:text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
