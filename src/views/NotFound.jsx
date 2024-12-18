import {useNavigate} from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5">
      <h1 className="text-9xl font-bold p-10">Oops!</h1>
      <p>We couldn&apos;t find the page you looking for</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-black text-white py-2 px-4 rounded-full"
      >
        Go back
      </button>
    </div>
  );
}
