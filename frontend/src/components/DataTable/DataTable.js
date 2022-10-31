// App.js
import React, {useEffect} from 'react';
import manager from '../../helpers/manager';
import CircularProgress from '@mui/material/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


function DataTableDemo(props) {
    const cookies = new Cookies();
    const [cookie, setCookie] = React.useState(cookies)
    const navigate = useNavigate()
    const [table, setTable] = React.useState([])
    const [loader, setLoader] = React.useState(true)

    useEffect(() => {
        console.log('DEBUG COOKIES',cookies)
        setCookie(cookies.get('token')) 
        verifyLogin()
        manager.getTable(setTable, setLoader)
        setLoader(true)
    },[])

  //   useEffect(() => {
  //     verifyLogin()
  // },[cookie])

  // useEffect(() => {
  //   verifyLogin()
  // })

  function signout(){
    console.log("DEBUG SIGNOUT")
    cookies.remove('token')
    verifyLogin()
  }

  function verifyLogin(){
    cookies.get('token') ? navigate('/'): navigate('/signin')
  }

  const columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'age', text: 'Age', sort: true },
    { dataField: 'country', text: 'Country', sort: true },
    { dataField: 'gender', text: 'Gender', sort: true }
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <div className="App" style={{width: 700, display: 'block', alignItems: 'center', margin: 'auto', textAlign: 'center'}}> 
      <ToolkitProvider
        bootstrap4
        keyField='id'
        data={table}
        columns={columns}
        search
      >
        {
          props => (
            <div>
              <button style={{float: 'left', marginRight:-80}} onClick={signout} className="btn btn-primary">SIGN OUT</button>
              <h4 style={{marginRight: 55}}>People Database</h4>
              {!loader ? 
              <>
              <SearchBar {...props.searchProps} />
              <ClearSearchButton {...props.searchProps} />
              <div style={{marginTop:10 }}>
              <BootstrapTable
                defaultSorted={defaultSorted}
                pagination={pagination}
                {...props.baseProps}
              />
              </div> 
              </> : 
              <div style={{marginRight:40, marginTop: 55}}>
              <CircularProgress />
              <p>Loading Table Content</p>
              </div>
              }
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  );
}

export default DataTableDemo;