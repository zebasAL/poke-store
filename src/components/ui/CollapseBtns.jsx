import React from 'react';
import Collapsible from 'react-collapsible';
import PropTypes from 'prop-types';
import {
  BookmarkIcon, Icon, HeartIcon, StarIcon,
} from 'evergreen-ui';

const CollapseBtns = ({
  productDetails,
}) => (

  <div className="collapsible-container">
    <Collapsible
      classParentString="collapsible-details"
      className="materials-collapsible"
      trigger={(
        <div>
          <Icon icon={BookmarkIcon} size={15} />
          Category
        </div>
      )}
    >
      <p>
        {productDetails.category}
      </p>
    </Collapsible>
    <Collapsible
      classParentString="collapsible-details"
      className="dimensions-collapsible"
      trigger={(
        <div>
          <Icon color={productDetails.rating.rate > 3.9 ? 'danger' : null} icon={HeartIcon} size={15} />
          Rate
        </div>
      )}
    >
      <p>
        {productDetails.rating.rate}
      </p>
    </Collapsible>
    <Collapsible
      classParentString="collapsible-details"
      className="instructions-collapsible"
      trigger={(
        <div>
          <Icon color={productDetails.rating.count > 300 ? 'warning' : null} icon={StarIcon} size={15} />
          User Reviews
        </div>
      )}
    >
      <p>
        {productDetails.rating.count}
      </p>
    </Collapsible>

  </div>
);

CollapseBtns.propTypes = {
  productDetails: PropTypes.shape({
    category: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }).isRequired,
};

export default CollapseBtns;
