import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { TextInput } from "@/components/TextInput";

export function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="border-b border-gray-900/10">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
        <TextInput
          class={"sm:col-span-2"}
          label={""}
          input={"search"}
          value={searchParams.get("query")?.toString()}
          placeholder="検索"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
