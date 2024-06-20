import WineForm from './WineForm';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    id?: string[];
}

const Modal = ({ open, onClose, id }: ModalProps) => {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-25 z-50"
        >
            <div
                className="bg-white rounded-lg h-3/4 overflow-y-auto"
                style={{ width: '90%', maxWidth: '600px' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end p-2">
                    <button
                        className="text-black bg-gray-300 rounded-full p-2 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className="p-4">
                    <WineForm id={id} onClose={onClose} />
                </div>
            </div>
        </div>
    );
};

export default Modal;

