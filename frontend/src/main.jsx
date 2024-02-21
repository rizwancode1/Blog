import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/compIndex.js'


import {
  AddPost,
  EditPost,
  DetailPost,
  AllPosts,
  Home,
  Login,
  Signup,
  Results,

} from './pages/pageIndex.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/all-posts',
        element: (
          <AuthLayout authentication>
            <AllPosts/>
          </AuthLayout>
          )
      },
      {
        path : '/search/:q',
        element: (
          <AuthLayout authentication>
            <Results/>
          </AuthLayout>
          )
      },
      {
        path : '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
          )
      },
      {
        path : '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
          )
      },
      {
        path : '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
          )
      },
      {
        path : '/detail/:slug',
        element: (
          <AuthLayout authentication>
            <DetailPost/>
          </AuthLayout>
          )
      },
      {
        path : '/edit/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
          )
      },
      
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    {/* <App /> */}
    </Provider>
  </React.StrictMode>,
)
