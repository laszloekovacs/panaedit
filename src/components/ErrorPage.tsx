import React from 'react'
import styles from './Styles.module.scss'

const Error = ({ message }) => {
	const onClick = () => {
		location.reload()
	}

	return (
		<div className={styles.ErrorPage}>
			<div>
				<h2>Oh snap...</h2>
				<br />
				<p>{message}</p>
				<br />
				<button onClick={onClick}>reload</button>
			</div>
		</div>
	)
}

export default Error
