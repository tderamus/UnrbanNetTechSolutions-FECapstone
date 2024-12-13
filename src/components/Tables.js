/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';

function AssetTable({ listAssets = [] }) {
  // Get total cost of assets by type
  const assetTypeTotals = listAssets.reduce((accum, asset) => {
    if (!accum[asset.type]) {
      accum[asset.type] = 0;
    }
    accum[asset.type] += parseFloat(asset.price || 0);
    return accum;
  }, {});

  return (
    <div className="product-totals">
      <div>
        <h3>Cost of Assets</h3>
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
                <td>${listAsset.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Total Cost By Asset Type</h3>
        <table className="table table-striped asset-totals-list">
          <thead>
            <tr>
              <th>Asset Type</th>
              <th>Total Cost By Type</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(assetTypeTotals).map(([type, total]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AssetTable.propTypes = {
  listAssets: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }),
};
export default AssetTable;
