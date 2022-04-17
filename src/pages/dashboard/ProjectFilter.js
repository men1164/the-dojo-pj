const filterList = ["all", "mine", "development", "design", "marketing", "sales"]

export default function ProjectFilter({ currentFilter, changeFilter }) {

  const handleClick = newFilter => {
    changeFilter(newFilter)
  }

  return (
    <div className="project-filter">
      <p>Filter by: </p>
      <nav>
        {filterList.map(f => (
          <button key={f} onClick={() => handleClick(f)} className={currentFilter === f ? "active" : ""}>{f}</button>
        ))}
      </nav>
    </div>
  )
}
