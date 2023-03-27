import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Artist } from '../../models/Artist'
import './DataTable.css'
import { NumericFormat } from 'react-number-format';

const DataTable: FC = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/artists');
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  const renderHeader = (): JSX.Element => {
    return (
      <tr>
        <th>Name</th>
        <th className=''>Rate</th>
        <th className=''>Streams</th>
        <th className='droppable'>Payout</th>
      </tr>
    );
  };

  const renderRows = (): JSX.Element[] => {
    return data.map((row: Artist, index: number) => {
      return (
        <tr key={index} className={selectedRow === row._id ? 'selected' : ''}
          onClick={() => setSelectedRow(row._id)}
          onTouchStart={() => setSelectedRow(row._id)}
        >
          <td className='namecol'>{row.artist}</td>
          <td className='numcol'>
            <span><NumericFormat value={row.rate} displayType={'text'} thousandSeparator={true} decimalScale={4} fixedDecimalScale /></span>
          </td>
          <td className='numcol'>
            <span><NumericFormat value={row.streams} displayType={'text'} thousandSeparator={true} decimalScale={0} fixedDecimalScale/></span>
          </td>
          <td className='numcol droppable'>
            <span className='minorprefix'>$</span>
            <span><NumericFormat value={row.payout} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale/></span>
          </td>
          <div className={selectedRow === row._id ? 'selected editbutton' : 'editbutton'} >
            Edit
          </div>
        </tr>

      );
    });
  };

  return (
    <div

    >
      <table> 
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>

      </table>
      {/* <div>
             <ul className="pagination">
               {pageNumbers.map((number: number) => {
                 return (
                   <li
                     key={number}
                     onClick={() => handlePaginationClick(number)}
                     className={currentPage === number ? 'active' : undefined}
                   >
                     {number}
                   </li>
                 );
               })}
             </ul>
           </div> */}
    </div>
  );

}

export default DataTable;
