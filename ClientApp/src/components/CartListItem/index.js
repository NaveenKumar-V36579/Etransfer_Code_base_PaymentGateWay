import React from 'react';

const CartListItem = ({product}) => {
	return (
		<div className="card productListItem m-3 p-2">
			{product.map((item, index) => (
				<div className="subItem" key={`subItem${index}`}>
						<div className="listHeader">{item[0]}</div>
						<div className="listItem">{item[1]}</div>
				</div>
			))}
		</div>
	);
};

export default CartListItem;
