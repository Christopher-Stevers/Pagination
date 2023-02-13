
import { useRef, useState, useEffect, useCallback } from "react";
import { getItems } from "../utils";

const Pagination = ({   paginationState, PaginationCard}) => {
	const [paginationObj, setPaginationObj] = paginationState;
	const [loading, setLoading] = useState(false);
	const filtering = (items )=>{
		const filters = paginationObj.filters;
		return items.filter((item)=>{
			const filterKeys = Object.keys(filters);
			const passFilters = filterKeys.map((key)=>{
				if(item[key] !== filters[key]){
					return false;
				}
			})
			return !passFilters.includes(false);
		})

	}
	
	const [cursor, setCursor] = useState(paginationObj.cursor);
	const [complete, setComplete] = useState(paginationObj.complete);
	let observer = useRef();
	const fetchPage = async (currentPaginationObj)=>{


	  if (complete) {
		return;
	  }
	  const {nodes, cursor: newCursor, complete: newComplete} = await getItems(cursor, paginationObj.batch, paginationObj.ordering, paginationObj.filters)
	  setCursor(newCursor)
	  setPaginationObj({...currentPaginationObj, items: [...currentPaginationObj.items, ...nodes]})
	  setComplete(newComplete)
	}
useEffect( ()=>{
	let cancel = false;
	const fetchWhenEmpty =  ()=>{
	if(paginationObj.items.length === 0&& !complete&& !cancel){
		fetchPage(paginationObj);
	}
	}
 fetchWhenEmpty()
}, [paginationObj.items.length, complete])
	const lastElem = useCallback(async(node) => {
		if (observer.current) {
		  observer.current.disconnect();
		}
		if (node) {
		  let options = {
			rootMargin: '100px',
			threshold: 0.1,
		  };
		  const callback = async (entries) => {
			if (entries[0].isIntersecting && !complete && !loading ) {
				setLoading(true)
				console.log(paginationObj.items)
			  await fetchPage(paginationObj);
			  setLoading(false)
			}
		  };
		  observer.current = new IntersectionObserver(callback, options);
		  observer.current.observe(node);
		}
	  }, [paginationObj]);
	  const filteredItems = filtering(paginationObj.items);
	return (
			<div>
				{filteredItems.map((item, index) => {
	return	<div ref={index === filteredItems.length - 1 ? lastElem : null} className="pagination"><PaginationCard item={item}/>
		</div>})}
		   </div>
	);
}
export default Pagination;