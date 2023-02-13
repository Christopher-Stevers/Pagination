import { useEffect, useState } from 'react';
import Pagination from './pagination.js'
import styles from './paginationPage.module.css'

import PaginationCard from "./paginationCard";
// parent page sets up state variable for pagination obj
/*
pagination Obj should be passed from parent page to pagination component
type of paginationObj:
{
	items: [],
	ordering: {direction: "asc", field: "name"},
	filters: {color: "blue"},
	cursor: 0,
	complete: false,
	batch: 10
}
pagination page has setter for paginationObj.
pass repeated var to pagination component
Also need to have lib function for both ssr and csr portions that takes in
(cursor, paginationObj.batch, paginationObj.ordering, paginationObj.filters)
and returns
{nodes, cursor, complete}
*/
const PaginationPage = ({paginationObj}) => {
const paginationState = useState(paginationObj);
const [paginationObjState, setPaginationObjState] = paginationState;

const setFilters = (filters)=>{
	setPaginationObjState({...paginationObjState, filters})
}

const reverseArray = ()=>{
	setPaginationObjState({...paginationObjState, items: [], ordering:{direction: "desc", field: "name"}})
}
	  return (
	<div>
		<div className={styles.paginationPage}>Pagination Page</div>
		<div>
		<button onClick={reverseArray}>reverse array</button></div>
		<div>	<button onClick={()=>setFilters({color: "red"})}>filter blue</button></div>
	
<Pagination PaginationCard={PaginationCard} paginationState={paginationState} />
	
	</div>
  )
};
export default PaginationPage