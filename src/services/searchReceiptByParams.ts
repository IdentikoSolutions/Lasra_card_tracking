import { Axios } from '../Axios/Axios'
import { SearchParamsType } from '../interface/interface'

export const searchBatchByParams = async ({batchNo,jobNo,cardNo,page,pageSize}: SearchParamsType) => {
  if(!jobNo) jobNo=''
  if(!cardNo) cardNo=''
  if(!page) page=''
  if(!pageSize) pageSize=''
  if(!batchNo) batchNo=''
  // console.log("params")
  if(!batchNo&& !jobNo&& !cardNo)return
  try {
    const result = await Axios.get(
      `/batch/search?batchNo=${batchNo}&jobNo=${jobNo}&lassraId=${cardNo}&page=${page}&pageSize=${pageSize}`,
    )
    // console.log(result, 'from searchzBatchy7 Params')
    return result;
  } catch (e) {
    console.log(e)
  }
}
