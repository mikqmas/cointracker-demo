import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function Component({show, setShowModal, handleAddWallet}) {
    const [address, setAddress] = useState('');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };
  return (
    <>
      <Modal show={show} onClose={() => setShowModal(false)}>
        <Modal.Header>Add Wallet</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wallet Address</label>
                <input onChange={handleChange} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={() => {handleAddWallet(address); setShowModal(false)}}>Add</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
