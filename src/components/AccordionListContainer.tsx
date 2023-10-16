import React, {  useEffect, useState } from 'react'
import { Iselect } from '../interface/interface'
import { useNavigate } from 'react-router-dom'
import { MainSearch } from './Search'
// const AccordionOptions = React.lazy(() => import('./AccordionOptions'))

export const AccordionListContainer: React.FC<Iselect> = ({
  options,
  source,
  path,
  to,
  searchId
}) => {
  const nextroute = to ? to : '/receipts'
  // console.log(to,'to in listaccordioncontainer')
  // const [option, setOption] = useState<number[]>([])
  const [search,setSearch] = useState(0)
  const [toggle,setToggle] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    
  }, [source])
  return (
    <div>
        <>
        <div onClick={()=>navigate(`${source}`)}>View Receipts</div>
        
          {!toggle ? (<div onClick={()=>setToggle(true)}>Create new Receipt</div>):
          (<MainSearch
            field={'Batch No'}
            to={nextroute}
            api={`${searchId}=${search}`}
            search={search}
            onChange={(e) => setSearch(e.target.value)}
          />)
          }
        </>
    </div>
  )
}

// export default AccordionListContainer
