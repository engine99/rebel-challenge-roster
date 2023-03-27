import React, { FC, useEffect, useState } from 'react';
import { Artist } from '../../models/Artist'


const DataTable: FC = () => { 
   const [data, setData] = useState([]);

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
            <th>Rate</th>
            <th>Streams</th>
         </tr>
      );
      };

      const renderRows = (): JSX.Element[] => {
      return data.map((row: Artist, index: number) => {
         return (
            <tr key={index}>
            <td>{row.name}</td>
            <td>{row.rate}</td>
            <td>{row.streams}</td>
            </tr>
         );
      });
      };
   
      return (
         <div>
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
