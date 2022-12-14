import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from './redux/selectors/auth-selectors';
import { initialApp } from './redux/thunks/app-thunk';
import { getInitialApp } from './redux/selectors/app-selectors';
import { getCheckStatusesThunk, getProductTypesThunk, getResultsStatusesThunk } from './redux/thunks/product-thunk';
import { getBalanceThunk } from './redux/thunks/authRequest-thunk';
import { takeResultStatuses, takeCheckStatuses } from './redux/selectors/product-selectors';
import AppRouter from './components/AppRouter';

function App() {

  const dispatch = useDispatch()

  const isAuth = useSelector(getIsAuth)
  const appInit = useSelector(getInitialApp)

  const resultStatuses = useSelector(takeResultStatuses)
  const checkStatuses = useSelector(takeCheckStatuses)

  useEffect(() => {
    !appInit && dispatch(initialApp())
    isAuth && dispatch(getProductTypesThunk(1, 1000))
    isAuth && dispatch(getBalanceThunk())
    isAuth && !resultStatuses && dispatch(getResultsStatusesThunk())
    isAuth && !checkStatuses && dispatch(getCheckStatusesThunk())
  }, [isAuth])


  if (!appInit) {
    return <div></div>
  }


  return (
    <div className="App">
        <AppRouter />
    </div>
  );
}

export default App;
