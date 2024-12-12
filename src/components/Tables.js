import PropTypes from 'prop-types';
import React from 'react';

function AssetTable({ listAssets = [] }) {
  return (
    <table className="table table-striped asset-list">
      <thead>
        <tr>
          <th>Asset Name</th>
          <th>Asset Price</th>
        </tr>
      </thead>
      <tbody>
        {listAssets.map((listAsset) => (
          <tr key={listAsset.firebaseKey}>
            <td>{listAsset.name}</td>
            <td>{listAsset.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

AssetTable.propTypes = {
  listAssets: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
  }),
};
export default AssetTable;
