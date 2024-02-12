import React, { useEffect } from 'react'
// import { createPortal } from 'react-dom';
import '../../'
import { IRequest } from '../../pages/homedelivery/AllDeliveryRequest'
import { useDelivery } from '../../context/DeliveryContext'
import Logo from '../Logo'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik'
import { Axios } from '../../Axios/Axios'
interface Ierror {
  name?: string
  dispatcher?: string
  pickup_date?: string
}
export const DeliveryOrder: React.FC<IRequest> = (item) => {
  const { setCurrent, current, mode } = useDelivery() as any
  const handleClick = () => {
    console.log(current, 'before')
    setCurrent(-1)
    console.log(current, 'after')
  }
  useEffect(() => {
    console.log(JSON.stringify(item), 'item')
  }, [item, current, mode])
  return (
    <div className="w-[600px] flex  h-fit shadow-sm min-h-[300px] bg-red m-auto  rounded-md  ">
      <div className="!bg-green-500 w-[25px] min-h-[300px]"></div>
      <div className="flex-col w-[500px] ml-3">
        <div className="w-[100%] flex justify-end">
          <Logo />
        </div>
        <h4 className="text-bold text-center">Complete the Order detail</h4>
        <div className="flex flex-wrap">
          <p className="text-[900] mr-3 ">
            <span className="font-bold">Lasrra Id: </span>
            <span>{item.lasrraId + '  '} </span>{' '}
          </p>
          <p className="text-bold mr-3">
            <span className="font-bold">Card Id:</span>{' '}
            <span>{item.cardId + '  '} </span>{' '}
          </p>
          <p className="text-bold mr-3">
            <span className="font-bold"> Collection center:</span>{' '}
            <span>{item.fromLocationCode + '  '} </span>{' '}
          </p>
          <p className="text-bold mr-3">
            <span className="font-bold">Date created: </span>{' '}
            <span>{item.updatedAt + '  '} </span>{' '}
          </p>
        </div>
       
        <Formik
          initialValues={{ name: '', dispatcher: '', pickup_date: '' }}
          validate={(values: Ierror) => {
            const errors: Ierror = {}
            if (!values.name) {
              errors.name = 'Required'
            }
            if (!values.dispatcher) {
              errors.dispatcher = 'required'
            }
            if (!values.pickup_date) {
              errors.pickup_date = 'Required'
            }
           
            return errors
          }}
          onSubmit={async(values, { setSubmitting }) => {
            try {
              const data = {
                cardId: item.cardId,
                deliveryRequestId: item.id,
                status: 0,
                createdBy: values.name,
                dispatcher: values.dispatcher,
                pickUpdate: values.pickup_date,
              }
             const result =await Axios.post('delivery/createdeliveryorder',data)
             toast.success(<div><h1>Successfully created</h1> <p>close and continue</p></div>)
            } catch (e) {
                toast.error(<h2>{JSON.stringify(e)}</h2>)
            }
              setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="rounded-sm h-fit flex-col text-red-500">
                <label
                  htmlFor="creator"
                  className="bg-gray-400 p-2 m-2 rounded-sm text-black"
                >
                  Creator's name :
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </label>
                {errors.name && touched.name && errors.name}
                <label
                  htmlFor="dispatcher"
                  className="bg-gray-400 p-2 m-2 text-black"
                >
                  dispatcher :
                  <input
                    type="text"
                    name="dispatcher"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dispatcher}
                  />
                </label>
                {errors.dispatcher && touched.dispatcher && errors.dispatcher}
                <label
                  htmlFor="dispatcher"
                  className="bg-gray-400 p-2 m-2 text-black"
                >
                  PickUp date :
                  <input
                    type="date"
                    name="pickup_date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pickup_date}
                  />
                </label>
                {errors.pickup_date &&
                  touched.pickup_date &&
                  errors.pickup_date}
              </div>
<ToastContainer newestOnTop position='bottom-center' closeOnClick/>
              <button
                className="bg-green-800 p-2 items-end  mx-2 rounded-md text-white"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
