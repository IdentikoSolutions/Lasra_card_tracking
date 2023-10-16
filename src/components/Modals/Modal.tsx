import React from 'react';
import { createPortal } from 'react-dom';

const Modal:React.FC<any> = ({children}) => {
    return createPortal(children,document.getElementById("modal-portal")!);
};

export default Modal;