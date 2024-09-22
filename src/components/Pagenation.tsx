import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: Data;
  sort: string;
  order: string;
  total: number;
}

interface Data {
  from: number;
  to: number;
  total: number;
  links: Array<Link>
}

interface Link {
  active: boolean;
  label: string;
  url: string;
}

function extractQueryParam(url: string, sort: string, order: string) {
  if (url) {
    const urlObj = new URL(url);
    const queryParams = new URLSearchParams(urlObj.search);
    return (
      "?page=" + queryParams.get("page") + "&sort=" + sort + "&order=" + order
    );
  } else {
    return "#";
  }
}

export function Pagenation(props: Props) {
  const startIndex = props.data.from;
  const endIndex = props.data.to;

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="">
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
                  href={
                    !link.active && link.url
                      ? extractQueryParam(link.url, props.sort, props.order)
                      : "#"
                  }
                  aria-current="page"
                  className={
                    link.active
                      ? "relative z-10 inline-flex items-center px-3 sm:px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                      : link.url
                      ? "relative items-center px-3 sm:px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-white focus:z-20 focus:outline-offset-0 inline-flex"
                      : "relative items-center px-3 sm:px-4 py-2 text-sm font-semibold text-neutral-700 inline-flex"
                  }
                  key={link.label}
                >
                  {link.label === "&laquo; 前" ? (
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : link.label === "次 &raquo;" ? (
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
