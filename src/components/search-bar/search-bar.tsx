export default function SearchBar(){
  return(
    <form className="search-bar">
      <input type="text" id='search-input' placeholder="..."/>
      <label className='label' htmlFor="search-input">Search GitHub username…</label>
      <input className='btn' type="submit" value="Search" />
    </form>
  )

}