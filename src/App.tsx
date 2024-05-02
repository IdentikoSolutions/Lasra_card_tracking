import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import ReactPlaceholder from 'react-placeholder';

import { GlobalStytle } from './styles/globalstyle.css'
import LoginPage from './pages/loginPage'
import { ListSkeleton } from './skeleton.tsx/Listskeleton'
// import { DispatchOrder, OrdersMAngager } from './pages/dispatchorder'
import { ReceiptDetailsPage, LandingPage, ViewDispatchOrders, ViewSingleDispatch, AllReceipt, RequestSummary, ViewRequestByLGACode, ViewSingleRetrivalOrder, ListRelocationHeader, OrdersMAngager, DispatchOrder, RetrivalOrder } from './pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import HomeDelivery from './pages/homedelivery/HomeDelivery'
import AllDeliveryRequest from './pages/homedelivery/AllDeliveryRequest'
import ErrorPage from './pages/homedelivery/ErrorPage'
import ViewAllHomeDelivery from './pages/homedelivery/ViewAllHomeDelivery'
import { DeliveryContextProvider } from './context/DeliveryContext'
const CardProductionReceipt = React.lazy(() =>
  import('./pages/CardProductionReceipt'),
)
const Provisioned = React.lazy(() => import('./pages/Provisioned'))
const ViewReceipt = React.lazy(() => import('./pages/ViewReceipt'))

function App() {
  return (
    // <div className="App">
    <Container className="container mx-0 px-0">
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
              path="receipt"
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
              path={'receipts'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewReceipt />
                </Suspense>
              }
            />
            <Route
              path={'cards'}
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
            >
                         <Route
                         index
                         element={
                           <Suspense fallback={<ListSkeleton lines={15} />}>
                             <ViewDispatchOrders />
                            </Suspense>
                              }
                             />
                           <Route
                              path={'all'}
                               element={
                            <Suspense fallback={<ListSkeleton lines={15} />}>
                              <OrdersMAngager />
                            </Suspense>
                             }
                               />
            </Route>
            <Route
              path={'retrival'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <RetrivalOrder/>
                  {/* <RequestSummary /> */}
                </Suspense>
              }
            >
               <Route
               index
              // path={'retrival/single/:id'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <RequestSummary />
                </Suspense>
              }
            />
            {/* <Route
              path={'retrival/single/:id'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewSingleRetrivalOrder />
                </Suspense>
              }
            /> */}
            <Route
              path={'all'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ListRelocationHeader />
                </Suspense>
              }
            />
            {/* <Route
              path={'retrival/all/:lgacode'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewRequestByLGACode />
                </Suspense>
              }
            /> */}
            </Route>
            {/* <Route
              path={'order/vieworders'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewDispatchOrders />
                </Suspense>
              }
            /> */}
            <Route
              path={'order/vieworders/:id'}
              element={
                <Suspense fallback={<ListSkeleton lines={15} />}>
                  <ViewSingleDispatch />
                </Suspense>
              }
            />
            <Route
              path={'delivery'}
              element={
                // <Suspense fallback={<ListSkeleton lines={15} />}>
                <DeliveryContextProvider>
                  <HomeDelivery />
                </DeliveryContextProvider>
                // </Suspense>
              }
            >
              <Route
                index
                // path={'home'}
                element={
                  <Suspense fallback={<ListSkeleton lines={15} />}>
                    <AllDeliveryRequest />
                  </Suspense>
                }
              />
              <Route
                path={'viewall'}
                // path={'home'}
                element={
                  <Suspense fallback={<ListSkeleton lines={15} />}>
                    <ViewAllHomeDelivery />
                  </Suspense>
                }
              />

              <Route
                path={'*'}
                element={
                  <Suspense fallback={<ListSkeleton lines={15} />}>
                    <ErrorPage />
                  </Suspense>
                }
              />
              {/* </Route> */}
            </Route>
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </Container>
    // </div>
  )
}

export default App
