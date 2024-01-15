// import React from 'react';

// export function Porter(props:any) {
//     return (
//         <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-gray-200  z-1 m-auto opacity-[0.05]'>
//             {props.children}
            
//         </div>
//     );
// }
// display: none;
//   position: fixed;
//   z-index: 1;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   background-color: rgba(0, 0, 0, 0.5);
import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Modal.setAppElement('#portal')
export function ModalWrap(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        {/* <button onClick={closeModal}>close</button> */}
        {props.children}
      </Modal>
    </div>
  );
}
