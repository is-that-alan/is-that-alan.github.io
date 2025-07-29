
interface InfoCardProps {
  onClose: () => void;
}

export default function InfoCard({ onClose }: InfoCardProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-700 mb-6">
          This is a placeholder for information about how the portfolio page works. You can explain the technologies used, the design philosophy, or any other relevant details here.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
