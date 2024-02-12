import styled from 'styled-components'
export const button ='rounded-sm px-3 py-2 hover:bg-green-600 flex items-center text-white group bg-green-500 relative'
export const overlay ='fixed flex-col justify-between items-stretch top-[30%] left-[30vw] p-1 w-fit bg-[#e0eee0] opacity-[1] overflow-hidden z-[200] rounded-sm'
export const Spinner =styled.div`
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
position:fixed;
top:300px;
left:600px;
width: 70px;
background:${({bg})=>`${bg}`};
  height: 70px;
  border: solid gray; /* Light grey */
  // border: 15px solid gray; /* Light grey */
  border-top: 15px solid lime; /* Black */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`

