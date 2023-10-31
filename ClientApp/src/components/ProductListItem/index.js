import React from "react";

const ProductListItem = ({ product, listItemStyle, subItemStyle }) => {
  return (
    <div className={`card productListItem mb-3 p-2 ${listItemStyle}`}>
      {product.map((item, index) => (
        <div className={`subItem ${subItemStyle}`} key={`subItem${index}`}>
          <div className="listHeader">{item[0]}</div>
          <div className="listItem">{item[1]}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductListItem;
