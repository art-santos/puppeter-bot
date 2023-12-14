export const PixGenerateButton = ({
  isValidNumber,
}: {
  isValidNumber: boolean;
}) => (
  <button
    type="submit"
    disabled={!isValidNumber}
    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    Gerar Pix
  </button>
);
