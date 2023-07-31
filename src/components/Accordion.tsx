import React, { Children, useEffect, useState } from 'react';
import { FaChevronUp } from "react-icons/fa"
import { LuChevronDown } from "react-icons/lu"
import { AccordionStyle, FlexRowSpaceBtw } from '../styles/styles';
// import { useNavigate } from 'react-router-dom';

interface Iaccordion {
    title?: string;
    list?:string|string[],
    children?:any,
    className?:string|undefined;
    page?:string
}

export const Accordion:React.FC< Iaccordion> =({title, list, page,children})=> {
    const [active,setActive] = useState(false)
    // const navigate = useNavigate()
    // console.log(active)
    useEffect(()=>{},[active,list])
    const handleClick = ()=>{
        setActive(!active)

        // if(page && active===false ) navigate(page)

    }
    return (
        <AccordionStyle >
            <FlexRowSpaceBtw onClick={handleClick} className={ active ? "active" :"undefined"}>
            <h2>{title}</h2> <h2> {active ? <FaChevronUp/>:<LuChevronDown/> }</h2>
            </FlexRowSpaceBtw>
            { active && <div>
                <h3>{list}</h3>
                </div>}
                { active && children}
                {Array.isArray(list)  && <Accordion page='/' title={'child'} list={"another element"}/>}
        </AccordionStyle>
    );
}

// export default Accordion;