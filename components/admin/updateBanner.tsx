import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  bannerIdToUpdate: string | null;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UpdateBanner: React.FC<Props> = ({ isOpen, onRequestClose, bannerIdToUpdate }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Dapat dilakukan inisialisasi state atau pengambilan data terkait bannerIdToUpdate di sini
  }, [isOpen]); // Memastikan efek hanya dijalankan saat komponen dibuka

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Kirim permintaan ke backend untuk mengupdate banner
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${bannerIdToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Pastikan Anda mengganti 'token' dengan header autentikasi yang sesuai
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, imageUrl })
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate banner.");
      }

      // Jika berhasil, Anda dapat menambahkan logika lain, seperti menampilkan pesan sukses
      console.log("Banner berhasil diupdate.");

      // Tutup modal setelah berhasil update
      onRequestClose();
    } catch (error) {
      setError( "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Update Banner Modal"
    >
      <h2 className="text-2xl mb-4">Update Banner</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title: 
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Update Banner"}
        </button>
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </form>
    </Modal>
  );
};

export default UpdateBanner;
