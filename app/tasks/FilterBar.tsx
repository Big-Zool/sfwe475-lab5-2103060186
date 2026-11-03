export type Filter = "all" | "done" | "open";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Show all tasks" },
  { value: "done", label: "Show done tasks" },
  { value: "open", label: "Show open tasks" },
];

type FilterBarProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={filter === value ? "active" : ""}
          aria-pressed={filter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
