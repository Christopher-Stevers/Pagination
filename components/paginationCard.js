import styles from './paginationCard.module.css'

const PaginationCard = ({item}) => {


	return (
		<div className={`${styles.paginationCard} ${item.color==="blue" ? styles.blue: styles.red}`}>
			{item.name}
		</div>
	);
}
export default PaginationCard;