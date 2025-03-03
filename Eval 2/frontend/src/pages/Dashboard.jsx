import React, { useEffect, useState } from "react";
import NoteCard from "@/components/Cards/NoteCard";
import { MdAdd, MdPictureAsPdf } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Modal.setAppElement("#root"); // Ensure Modal works properly

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, [currentUser, navigate]);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", {
        withCredentials: true,
      });

      if (!res.data.success) {
        console.error(res.data.message);
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error("Failed to fetch notes!");
      console.error(error.message);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/note/delete/${noteId}`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast.error("Error deleting note!");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error("Search failed!");
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        `http://localhost:3000/api/note/update-note-pinned/${noteId}`,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast.error("Failed to update pin status!");
    }
  };

  const getWelcomeMessage = () => {
    const date = new Date();
    const hours = date.getHours();
    const username = userInfo?.username;
    if (hours < 12) {
      return `Good Morning, ${username}`;
    } else if (hours >= 12 && hours < 17) {
      return `Good Afternoon, ${username}`;
    } else {
      return `Good Evening, ${username}`;
    }
  };

  // Function to Export Notes as PDF
  const exportNotesToPDF = () => {
    const doc = new jsPDF();
  
    allNotes.forEach((note, index) => {
      if (index !== 0) doc.addPage(); // Add new page for each note except the first one
  
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(note.title, 14, 20);
  
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Date: ${new Date(note.createdAt).toLocaleDateString()}`, 14, 30);
      
      doc.setFontSize(10);
      doc.text(`Tags: ${note.tags.join(", ")}`, 14, 40);
      
      doc.setFontSize(12);
      doc.text("Content:", 14, 50);
  
      // Handle multi-line text content
      const textLines = doc.splitTextToSize(note.content, 180);
      doc.text(textLines, 14, 60);
    });
  
    doc.save("MyNotes.pdf");
    toast.success("PDF Downloaded!");
  };
  
  const sendNotesByEmail = async () => {
    try {
      const email = prompt("Enter your email to receive the PDF:");
  
      if (!email) {
        toast.error("Email is required!");
        return;
      }
  
      const res = await axios.post("http://localhost:3000/api/email/send-email", { email });
  
      if (res.data.success) {
        toast.success("Email sent successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to send email!");
    }
  };
  

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <h1 className="text-center font-semibold text-3xl mt-3">
        {getWelcomeMessage()}
      </h1>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => handleEdit(note)}
              onDelete={() => deleteNote(note)}
              onPinNote={() => updateIsPinned(note)}
            />
          ))}
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="absolute right-10 bottom-10 flex flex-col gap-3">
        {/* Add Note Button */}
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black hover:bg-black/80"
          onClick={() =>
            setOpenAddEditModal({ isShown: true, type: "add", data: null })
          }
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        {/* Export PDF Button */}
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-red-600 hover:bg-red-500"
          onClick={exportNotesToPDF}
        >
          <MdPictureAsPdf className="text-[32px] text-white" />
        </button>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-red-600 hover:bg-green-500"
          onClick={sendNotesByEmail}
        >
          <MdPictureAsPdf className="text-[32px] text-white" />
        </button>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-32 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
