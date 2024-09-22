interface Props {
  sectionName: string;
}

export function Heading(props: Props) {
  return (
    <div className="py-5">
      <h1 className="text-2xl font-bold">{props.sectionName}</h1>
    </div>
  );
}
