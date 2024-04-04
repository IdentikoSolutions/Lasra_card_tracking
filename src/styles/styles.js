import styled from 'styled-components'
export const button =`rounded-sm px-3 py-2 hover:bg-green-600 flex items-center text-white group disabled:bg-gray-500 bg-green-500 relative md:flex-1`
export const button2 ='mx-3 shadow-md hover:bg-green-500 hover:text-white bg-green-200 p-2 rounded-md border-1 flex-1 '
export const tableIcons ='text-slate-400 hover:text-slate-600 text-[2rem] m-3 hover:bg-green-300 hover:border-green hover:border-2'
export const input ='border-2 shadow-md border-zinc-200 flex-1 h-[2rem] '
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

