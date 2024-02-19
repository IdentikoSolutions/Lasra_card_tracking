import { Axios } from '../Axios'

export async function getReceiptsNos(path: string): Promise<any[]> {
  try {
    const {data} = await Axios.get(path)
    return data;
  } catch (e) {
    console.log(path)

    throw new Error(e + ' Was not able to get provisioned batch ...'+path)
  }
}
