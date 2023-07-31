import styled from 'styled-components'
import { color } from '../artifacts/colors'
export const Div = styled.div`
  width: 100vw;
  height: 'fit-content';
  padding: 0.2rem;
  background-color: #14763b;
  display: flex;
  justify-content: space-between;
`
export const LogoWrapper = styled.div`
  ${({ width, height, src }) => `
width: ${width};
height: ${height};
background-image:url(${src});
background-size: cover;
`}
`
export const LGText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  background-image: linear-gradient(
    to right,
    rgba(18, 39, 1, 1),
    rgba(203, 12, 12, 1) !important
  );
`
export const FlexRow = styled.nav`
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  align-self: center;
`
export const FlexRowSpaceBtw = styled.div`
  margin: 1px;
  display: flex;
  position: float;
  top: 0;
  width: 100%;
  justify-content: space-between;
  background: ${color.navbar};
  //ececec;
  :hover {
    background: linear-gradient(to bottom, #ececec, #0ff, #ececec);
  }
  h2 {
    padding: 0 1rem;
  }
  box-shadow: 1px 3px 0 #7b9768;
  transition: all 0.1s linear;
  :active {
    // box-shadow:0 0px 0 red;
    transform: translateY(2px);
  }
`
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`

export const Button = styled.button`
  ${({ bg }) => `
background-color:${bg};
`}
  color:#40473d;
  box-shadow: 0 5px 0 ${color.auto};
  transition: all 0.1s linear;
  :active {
    box-shadow: 0 2x 0 ${color.auto};
    transform: translateY(2px);
  }
`
// style for list of card details
export const List = styled.div`
  width: fit-content;
  height: 1.5rem;
  overflow-y: hidden;
  position: relative;
  display: grid;
  grid-column-gap: 5px;
  grid-template-columns: 150px 150px 150px 150px 200px 50px 150px auto;
  grid-template-areas: 'lasrraId firstname middlename surname phone status comment edit';
  justify-content: space-between;
  margin: 2px 10px;
  padding: 2px 10px;
  background-color: rgba(217, 217, 217, 0.82);
  :hover {
    background: #acfbb7;
  }
  p {
    font-size: 1rem;
    font-weight: 700;
    padding: 0.2rem;
    margin: 0.1rem;
  }
`
//styles for report a card
export const ReportStyle = styled(FlexRow)`
  display: grid;
  grid-template-columns: 100px 200px;
  label {
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin: 20px 10px 0 10px;
    justify-content: space-between;
  }
  input {
    flex: 1;
    border: 3px solid #67f835;
    border-radius: 4px;
    background-color: #d9d9d9;
    margin: 20px 10px 0 10px;
  }
  button {
    padding: 2rem 4rem;
    justify-self: flex-end;
  }
  .text {
    height: 1.5rem;
  }
  textarea {
    text-align: left;
    min-height: 150px;
    flex: 1;
    border: 3px solid #67f835;
    border-radius: 4px;
    background-color: #d9d9d9;
    margin: 5px 10px 5px 10px;
  }
`
export const InputWrapper = styled.div`
  ${({ width }) => `
width:${width};
`}
  align-self:flex-end;
  display: grid;
  grid-template-columns: 40% auto;
  align-items: center;
  border: 3px solid #67f835;
  // margin: 0.5rem;
  border-radius: 8px;
`

export const Label = styled.label`
  ${({ bg }) => `
background-color: ${bg || '#164605'};

`}
  padding:5px;
  color: white;
  font-size: 1rem;
  font-weight: 800;
  border-radius: 8px 0 0 8px;
  border: none;
`

export const Input = styled.input`
  width: fit-container;
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 0 8px 8px 0;
`
export const GridBox = styled.div`
  display: grid;
  ${({ template }) => `
  grid-template-columns: ${template};
`}
  align-items:flex-start;
`
export const MainDiv = styled.div`
  margin: 5px 5px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  min-width: 30%;
  overflow-y: hidden;
  background-color: white;
  min-height: 200px;
  border: 3px solid #67f835;
  border-radius: 8px;
  transition-property: background-color;
  transition-duration: 1s;
  transition-timing-function: linear;
  ${({ width }) => `
width:${width};
`}
`
export const TitleDiv = styled.div`
  margin: 0px 50px;
  position: relative;
  transition: transform 0.3s ease-in-out;
  color: black;
  font-weight: bold;
  backface-visibility: hidden; /* Hides the back face of the pages */
  transition: transform 0.6s;
  z-index: 1;
  top: 20px;
  left: 50px;
  width: fit-content;
  background-color: white;
  border: 3px solid #67f835;
  border-radius: 8px;
  min-height: 20px;
`
export const FlexSearch = styled(FlexRow)`
  ${({ padding }) => `
padding:${padding};
`}
  // width:'fit-container';
  display:flex;
  justify-content: space-between;
  align-content: center;
  span {
    font-weight: bold;
    padding: 1rem;
  }
`
export const WrapperDiv = styled.div`
  display: flex;
  padding: 0.5rem;
  background-color: #d9d9d9;
  overflow-x: hidden;
`
export const SearchButton = styled(Button)`
  border-radius: 8px;
  color: white;
  font-weight: bold;
  background-color: #40473d;
  // padding: 0.5rem 1rem;
`
export const SearchInput = styled.input`
  border-radius: 8px;
  border: none;
  // width: 300px;
`
export const FitScreen = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  align-items: flex-start;
  background: linear-gradient(to right, lightblue, transparent, lightblue);
`
export const Overlay = styled.div`
  ${({ img }) => `
background: linear-gradient(to right, transparent, green),
url(${img}) no-repeat center, lightblue;`}
  width: 70%;
  height: 50vh;
  position: absolute;
  bottom: 100px;
  margin: auto auto;

  background-size: contain;
  border: 1px #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  box-shadow: 5px 5px 5px 5px green;
`
export const DetailWrapper = styled.div`
  ${({ margin, bg, direction }) => `
margin:${margin};
background-color:${bg};
flex-direction:${direction};

`}
  display:flex;
  // flex-wrap:wrap;
  justify-content: space-between;
  border: 3px solid #02390b;
  // min-height:50px;
  // width:"fit-container";
  // flex:1;
  // min-width:75%;
  h3 {
    margin: auto !important;
    width: 'fit-content';
    text-justify: auto;
    justify-content: center;
    font-weight: bold;
  }
`
export const Field = styled.div`
  ${({ bg, color }) => `
background-color: ${bg};
color:${color};
`}
  margin:0.5rem 1rem;
  width: 'fit-content';
  padding: 0.5rem;
`
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto auto auto;
  grid-template-rows: auto;
  grid-template-areas: ' sidebar main main main';
  @media (max-width:768px){
    grid-template-columns auto;
    grid-template-areas:main;
    grid-template-rows: auto;
  }
`
export const Sidebar = styled.div`
  height: 100vh;
  overflow-x: hidden;
  border-right: 1px solid black;
  grid-area: sidebar;
  .active {
    background: ${color.active};
    color: ${color.white};
    // linear-gradient(to right,white, #0ff,#67f805,#0ff,white);
  }
  @media (max-width: 768px) {
    grid-area:main;
    visibility:hidden;
  }
`
export const Mainbar = styled.div`
  overflow-x: hidden;
  height: 100vh;
  padding: 1rem;
  grid-area: main;
`
export const AccordionStyle = styled.div`
  background: white;
  position: relative;
  max-height: 300px;
  overflow-x: hidden;
  h3 {
    padding: 2px;
    margin: 0;
    color: ${color.auto};
    text-align: center;
  }
`
export const NumberInput = styled.input`
  width: 30px;
  height: fit-content;
`
export const Video = styled.video`
  height: vh;
  width: 100vw;
  object-fit: cover;
  position: absolute;
  opacity: 0.5;
`

export const OverlayCard = styled.div`
position:fixed;
top:200px;
padding:1rem;
width:fit-content;
background:green;
overflow-y:hidden;
z-index:200;
border-radius:6px;
border:2px solid black;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:stretch;
box-shadow:0 0 5px 5px green;
label{
  display:flex;
  padding:5px;
color:white;
  flex:1;
}
input{
  background:white;
}
`
