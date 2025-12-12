import {useDispatch, useSelector} from "react-redux";
import {deleteAddress, getAddressById} from "../../app/slices/addressSlice";

export default function Addresses({
  handleCloseModal,
  handleOpenModal,
  addresses,
  setSelectedAddress,
}) {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.address);

  const handleDelete = id => {
    dispatch(deleteAddress(id))
      .unwrap()
      .then(() => handleOpenModal("showAddresses"))
      .catch(err => console.log(err));
  };

  const handleSelectAddress = address => {
    dispatch(setSelectedAddress(address));
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-full md:w-1/2 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-2 rounded-xl shadow-lg ">
        <div className="p-2 rounded-md space-y-3">
          <div className="relative flex justify-between items-center border-b border-primary pb-1 text-primary">
            <h3 className="font-medium text-xl ">Addresses</h3>
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={handleCloseModal}
            >
              <i className="fa-solid fa-xmark "></i>
            </button>
          </div>
          {loading && (
            <div className="fixed inset-0  z-40">
              <div className="flex justify-center items-center h-full">
                <i className="fa-solid fa-spinner text-xl text-primary animate-spin"></i>
              </div>
            </div>
          )}
          {addresses.map(address => (
            <div key={address.id} className="p-2 bg-white rounded-md">
              <div
                className="cursor-pointer"
                onClick={() => handleSelectAddress(address)}
              >
                <h4>
                  <span className="font-medium">{address.name}</span> |{" "}
                  <span>+62{address.phone_number}</span>
                </h4>
                <p>
                  {address.address}, {address.city}, {address.postal_code}
                </p>
              </div>
              <div className="flex gap-x-5 border-t mt-2 pt-2 px-1 text-primary">
                <button
                  className="hover:underline font-medium"
                  onClick={() => {
                    dispatch(getAddressById(address.id));
                    handleOpenModal("updateAddress");
                  }}
                >
                  Edit
                </button>
                <button
                  className="hover:underline font-medium"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-3">
            <button
              className="py-2 px-4 rounded-md font-medium border border-primary  text-primary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 rounded-md font-medium bg-primary text-secondary"
              onClick={() => handleOpenModal("createNewAddress")}
            >
              Create New Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
