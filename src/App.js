import React, { useState,useEffect } from 'react'
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Siderbar';
import Homescreen from './components/screee/homescreen/Homescreen'
import { Container } from 'react-bootstrap';
import "./scss/_App.scss";
import Loginscreen from './components/screee/login/Loginscreen';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Watchscreen from './components/screee/watchscreen/Watchscreen';
import Searchscreen from './components/screee/searchscreen/Searchscreen';
import Subscriptionscreen from './components/screee/subscriptionsScreen/Subscriptionscreen';

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)
  const handleToggleSidebar = () => toggleSidebar(value => !value)
  return (
     <>
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className='app__container'>
           <Sidebar
              sidebar={sidebar}
              handleToggleSidebar={handleToggleSidebar}
           />
           <Container fluid className='app__main '>
              {children}
           </Container>
        </div>
     </>
  )
}

export default function App() {
  const {accessToken,loading} = useSelector(state => state.authreducer); 
  const history = useHistory();

  useEffect(() => {
    if(!accessToken && !loading){
      history.push('/auth');
    }  
  }, [accessToken,loading,history]) 

  return (
      <Switch>
        <Route path="/" exact>
          <Layout>
            <Homescreen />
          </Layout>
        </Route>

        <Route path="/auth" exact>
          <Loginscreen />
        </Route>

        <Route path="/search" exact>
          <Layout>
            <Loginscreen />
          </Layout>
        </Route>
        
        <Route path="/watch/:id" exact>
          <Layout>
            <Watchscreen />
          </Layout>
        </Route>

        <Route path="/search/:id" exact>
          <Layout>
            <Searchscreen />
          </Layout>
        </Route>

        <Route path="/feed/subscription" exact>
          <Layout>
            <Subscriptionscreen />
          </Layout>
        </Route>

        <Route>
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
  )
}
