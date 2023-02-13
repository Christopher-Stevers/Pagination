import { sampleArray } from './constants';

const arrayGenerator = async(cursor, batch,sortOrder, orderBy, filters) => {
	let newCursor = cursor + batch;
	console.log("sortOrder", sortOrder, cursor)
	if (cursor === 100){
	  if(sortOrder === "asc"){
	  return {nodes: sampleArray.slice(0, 5), cursor: newCursor}
	  } else {
		
		return {nodes: sampleArray.slice(5, 10).reverse(), cursor: newCursor}
	  }
	}
	  if(sortOrder === "asc"){
	  return {nodes: [...sampleArray],  cursor: newCursor}
	  }
	  return {nodes:[ ...sampleArray].reverse(),  cursor: newCursor}
	
	}
	export  const getItems = async (oldCursor, batch, ordering="asc", filters={}) => {
		const {direction, field}= ordering;
		const sortOrder = direction;
		const orderBy = field;
	
	  // swap out for prod cursor;
	 const {nodes, cursor}= await arrayGenerator(oldCursor, batch, sortOrder, orderBy, filters);
	
	  return {nodes,  cursor, complete : nodes.length < batch}
	}
	export const paginatedGetItems = getItems;