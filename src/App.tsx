import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import ReactPlaceholder from 'react-placeholder';

// import 'react-placeholder/lib/reactPlaceholder.css';
import { GlobalStytle } from './styles/globalstyle.css'
import LoginPage from './pages/loginPage'
import AllReceipt from './pages/AllReceipt'
import { ListSkeleton } from './skeleton.tsx/Listskeleton'
import { DispatchOrder } from './pages/DispatchOrder'
import { ReceiptDetailsPage } from './pages/ReceiptDetailsPage'
import { LandingPage } from './pages/LandingPage'
const CardProductionReceipt = React.lazy(() =>
  import('./pages/CardProductionReceipt'),
)
const Provisioned = React.lazy(() => import('./pages/Provisioned'))
const ViewReceipt = React.lazy(() => import('./pages/ViewReceipt'))

function App() {
  return (
    <div className="App">
      <GlobalStytle />
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path={'receipts'} element={<AllReceipt />}>
            {/* <Header /> */}
            <Route
              index
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path='receipt'
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <CardProductionReceipt />
                </Suspense>
              }
            />
            <Route
              path={'provision'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <Provisioned />
                </Suspense>
              }
            />
            <Route
              path={':receipts'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ReceiptDetailsPage />
                </Suspense>
              }
            />
            <Route
              path={'provision/:id'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewReceipt />
                </Suspense>
              }
            />
            <Route
              path={'cards/:id'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewReceipt />
                </Suspense>
              }
            />
            <Route
              path={'order'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <DispatchOrder />
                </Suspense>
              }
            />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  )
}

export default App
