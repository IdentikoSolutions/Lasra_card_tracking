import React, { useEffect } from 'react'
// import { createPortal } from 'react-dom';
import '../../'
import { IRequest } from '../../pages/homedelivery/AllDeliveryRequest'
import { useDelivery } from '../context/DeliveryContext'
import Logo from '../../artifacts/Logo'
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
export const DeliveryOrderMultiple = () => {
  const { current, mode, orderlist } = useDelivery() as any
  //   const handleClick = () => {
  //     console.log(current, 'before')
  //     setCurrent(-1)
  //     console.log(current, 'after')
  //   }
  useEffect(() => {
    // console.log(JSON.stringify(item), 'item')
  }, [mode])
  return (
    <div className="w-[600px] flex overflow-auto h-fit max-h-[100vh] shadow-sm min-h-[300px] bg-red m-auto  rounded-md  ">
      {/* <div className="!bg-green-500 w-[50px] min-h-[300px]"></div> */}
      <div className="flex-col w-[500px] ml-3">
        {/* <div className="w-[100%] flex justify-end">
          <Logo />
        </div> */}
        <h4 className="text-bold text-center">Complete the Order detail</h4>

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
              const datalist = orderlist.map((item:any) => ({
                cardId: item.cardId,
                deliveryRequestId: item.id,
                status: 0,
                createdBy: values.name,
                dispatcher: values.dispatcher,
                pickUpdate: values.pickup_date,
              }))
              for (let data of datalist){
                console.log(data,'request data')
                try{
                    const result =await Axios.post('delivery/createdeliveryorder',data)
                    console.log(result)
                }catch(e){
                    console.log(e)
                }
               
            }
              console.log(datalist,'datalist')
            } catch (e) {
                console.log(e)
            }
            // console.log('submitti')
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            // }, 400)
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <button
                className="bg-green-800 p-2 items-end  mx-2 rounded-md text-white"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
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
              {orderlist.map((item: any, idx: any) => (
                <OrderCard kry={idx} item={item} values={values} />
              ))}
            </form>
          )}
        </Formik>
        {/* <button
          className="bg-green-800 p-2 items-end  mx-2 rounded-md text-white"
          onClick={handleClick}
        >
          close
        </button> */}
        {/* </div> */}
      </div>
    </div>
  )
}
const OrderCard: React.FC<any> = ({ item, values }) => {
  return (
    <div className="w-[600px] flex  h-fit shadow-md min-h-[300px] bg-red my-3  rounded-md  ">
      <div className="!bg-green-500 w-[25px] min-h-[300px]"></div>
      <div className="flex-col w-[500px] ml-3">
        <div className="w-[100%] flex justify-end">
          <Logo />
        </div>
        <h4 className="text-bold text-center">Complete the Order detail</h4>

        <div className="rounded-sm h-fit flex flex-col m-auto">
          <div>
            <label
              htmlFor="creator"
              className="w-[150px] bg-gray-400 p-2 my-2 ml-2 mr-0 rounded-tl-md rounded-bl-md"
            >
              Creator name :
            </label>
            <input
              className="border-gray-400 border-1 p-2 w-[200px] rounded-tr-md rounded-br-md"
              type="text"
              id="creator"
              value={values.name}
              onChange={() => ''}
            />
          </div>
          <div>
            <label
              htmlFor="dispatcher"
              className="bg-gray-400 w-[150px] p-2 my-2 ml-2 mr-0 rounded-tl-md rounded-bl-md"
            >
              dispatch name
            </label>
            <input
              type="text"
              className="border-gray-400 border-1 p-2 w-[200px] rounded-tr-md rounded-br-md"
              id="dispatcher"
              value={values.dispatcher}
              onChange={() => ''}
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="bg-gray-400 w-[150px] p-2 my-2 ml-2 mr-0 rounded-tl-md rounded-bl-md"
            >
              pickup date
            </label>
            <input
              type="date"
              className="border-gray-400 border-1 p-2 w-[200px] rounded-tr-md rounded-br-md"
              id="creator"
              value={values.pickup_date}
              onChange={() => ''}
            />
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-3">
          <p className="text-[900] mr-3 ">
            <span className="font-bold">Lasrra Id : </span>
            <span className="underline w-[200px]">
              {item.lasrraId + '  '}{' '}
            </span>{' '}
          </p>
          <p className="text-bold">
            <span className="font-bold">Card Id : </span>{' '}
            <span className="underline w-[200px]">{item.cardId + '  '} </span>{' '}
          </p>
          <p className="text-bold mr-3">
            <span className="font-bold">Request Id : </span>{' '}
            <span className="underline w-[200px]">{item.id + '  '} </span>{' '}
          </p>
          <p className="text-bold mr-3">
            <span className="font-bold"> Collection center:</span>{' '}
            <span className="underline w-[200px]">
              {item.fromLocationCode + '  '}{' '}
            </span>{' '}
          </p>
          <p className="text-bold mr-3">
            <span className="font-bold">Date created : </span>{' '}
            <span className="underline w-[200px]">
              {item.updatedAt + '  '}{' '}
            </span>{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
