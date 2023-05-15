import React, {FC} from 'react'

interface ModalProps{
no: string;
parentSet?: string;
titleModal?: string;
children?: React.ReactNode;
}

const Modal: FC<ModalProps> = ({no, parentSet, titleModal, children}) => {
  return (
    <>
      <input type="checkbox" id={`my-modal-${no}`} className="modal-toggle" />
      <div className="modal modal-middle sm:modal-middle">
        <div
          className={`modal-box border-4 border-blue-400 flex flex-col justify-center text-sky bg-white ${parentSet}`}
        >
          <p className="mb-5 pb-2 text-xl border-b-2 font-bold text-black ">
            {titleModal}
          </p>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal