import { Axios } from '../Axios/Axios'

export async function getReceiptsNos(path: string): Promise<any[]> {
  console.log(path,"path")
  try {
    const {data} = await Axios.get(path)
    return data;
  } catch (e) {

    throw new Error(e + ' Was not able to get provisioned batch ...'+path)
  }
}
