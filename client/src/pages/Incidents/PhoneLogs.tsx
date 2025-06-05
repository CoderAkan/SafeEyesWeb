import { FC, useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import { BarChart } from '@mui/x-charts/BarChart';
import { useNavigate } from 'react-router-dom';
import { Incident } from '../../types';
import { instance } from '../../api/axios.api';

const PhoneLogs: FC = () => {

  const [phonePaginatedTable, setPhonePaginatedTable] = useState<Incident[]>([])

  useEffect(() => {
    const fetchFireLogs = async () => {
      try {
        const resp = await instance.get('/incident', {
          params: {
            type: 'Phone'
          }
        });
        if (resp.data != null) {
          setPhonePaginatedTable(resp.data)
        } else {
          console.log(resp.data);
        }
      }
        catch (error) {
          console.log(error);
        }
        }
      fetchFireLogs();
    }, [])

    const phonePaginatedTable2 = [
        {number: 1, date: "01/01/2025", name: "Sergey W."},
        {number: 2, date: "03/01/2025", name: "Alan J."},
        {number: 3, date: "03/01/2025", name: "Mark R."},
        {number: 4, date: "05/01/2025", name: "Mark J."},
        {number: 5, date: "06/01/2025", name: "Akan K."},
        {number: 6, date: "10/01/2025", name: "Gulim N."},
        {number: 7, date: "11/01/2025", name: "Machambet Z."},
        {number: 8, date: "12/01/2025", name: "Maksat K."},   
    ]

    const navigate = useNavigate();
    
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = phonePaginatedTable.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
        <div className='flex'>
          <SideBar />
          <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div>
               Phone logs
            </div>
            <div className='flex flex-col justify-between mt-10 h-fit'>
                {/* <div className='flex justify-between mb-10'>
                    
                </div> */}
          
                <div className='w-full bg-white rounded-md text-slate-900 px-4 py-2'>
                    Number of phone incidents in 2025:
                    <BarChart series={[
                            {data: [6, 5, 4, 3, 2, 0]},
                        ]}
                        height={290}
                        xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }]}
                    />
                </div>

                <div id="Log graph" className='mb-10 mt-10'>
                    <table className="table-auto w-full text-left border-collapse border border-gray-300">
                        <thead className="bg-blue-100">
                            <tr>
                              <th className="px-6 py-3 font-medium text-gray-700">ID</th>
                              <th className="px-6 py-3 font-medium text-gray-700">Name</th>
                              <th className="px-6 py-3 font-medium text-gray-700">Date</th>
                             </tr>
                            </thead>
                            <tbody>
                              {currentItems.map((incident, index) => (
                                <tr onClick={() => {navigate(`/ppe/${incident.id}`)}} key={`${incident.id}-${index}`} className="border-b hover:bg-gray-50 hover:text-gray-700">
                                  <td className="px-6 py-3">{index+1}</td>
                                  <td className="px-6 py-3">{incident.worker.full_name}</td>
                                  <td className="px-6 py-3">{incident.timestamp.toString()}</td>
                                </tr>
                              ))}
                           </tbody>
                         </table>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:bg-slate-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(phonePaginatedTable.length / itemsPerPage)}
                            className="px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:bg-slate-700 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )
}

export default PhoneLogs
