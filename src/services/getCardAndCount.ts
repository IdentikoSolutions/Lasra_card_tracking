import { Axios } from '../Axios/Axios'

export const getCardsAndCount = async (receipt_id: number) => {
  try {
    return await Axios.get('/cardreceipt?receipt_id=' + receipt_id)
  } catch (e) {
    throw new Error("Couldn't complete the fetch");
  }
}
