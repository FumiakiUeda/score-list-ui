import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"

type Props = {
  total: number;
  data: object;
};

interface Link {
  active: boolean;
  label: string;
  url: string;
}

function extractQueryParam(url: string) {
  if (url) {
    const urlObj = new URL(url);
    const queryParams = new URLSearchParams(urlObj.search);
    return "?page=" + queryParams.get("page");
  } else {
    return "#";
  }
}

export function Pagenation(props: Props) {
  const perPage = props.data.per_page;
  const page = props.data.current_page;
  const startIndex = props.data.from;
  const endIndex = props.data.to;

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
            <span className="font-medium">{props.data.total}</span>件中
            <span className="font-medium">{startIndex}</span>～
            <span className="font-medium">{endIndex}</span>件を表示
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            {props.data &&
              props.data.links.map((link: Link) => (
                <Link
                  href={!link.active && link.url ? extractQueryParam(link.url) : "#"}
                  aria-current="page"
                  className={
                    link.active
                      ? "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold dark:text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                      : "relative hidden items-center px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:z-20 focus:outline-offset-0 md:inline-flex"
                  }
                  key={link.label}
                >
                  {link.label === "&laquo; Previous" ? (
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : link.label === "Next &raquo;" ? (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    link.label
                  )}
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
