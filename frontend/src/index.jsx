import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'
import AddPost from './pages/AddPost'
import Details from './pages/Details'
import ModifyPost from './pages/ModifyPost'
import Header from './components/Header'
import Error from './components/Error'
import Footer from './components/Footer'
import Profil from './pages/Profil'
import ThemeProvider from './utils/context/index'
import GlobalStyle from './utils/style/Globalstyle'
import TokenProvider from './utils/context/index2'

ReactDOM.render(
    <React.StrictMode>
        <Router>
          <ThemeProvider>
          <TokenProvider>
          <GlobalStyle />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/Posts">
                <Header />
                <Posts />
              </Route>
              <Route path="/Details/:postId">
                <Header />
                <Details />
              </Route>
              <Route exact path="/AddPost">
                <Header />
                <AddPost />
              </Route>
              <Route exact path="/Update/:postId">
                <Header />
                <ModifyPost/>
              </Route>
              <Route exact path="/Profil/:userId">
                <Header />
                <Profil />
              </Route>
              <Route>
                <Header />
                <Error />
              </Route>
            </Switch>
            <Footer />
          </TokenProvider>
          </ThemeProvider>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
)