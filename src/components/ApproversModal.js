import React from 'react'
import Modal from 'react-modal'

import ApprovalFlowEditor from './ApprovalFlowEditor'

const styles = {
  modal: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      minWidth: '60%',
      transform: 'translate(-50%, -50%)',
    },
  },
}

const ApproversModal = ({ modalIsOpen, closeModal }) => {
  Modal.setAppElement('#root')
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={styles.modal} data-testid="approvers-modal">
      <ApprovalFlowEditor closeModal={closeModal} />
    </Modal>
  )
}

export default ApproversModal
