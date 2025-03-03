// import React, { useState } from "react";
// import { MdClose } from "react-icons/md";
// import TagInput from "@/components/Input/TagInput ";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";

// const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
//   const [title, setTitle] = useState(noteData?.title || "");
//   const [content, setContent] = useState(noteData?.content || "");
//   const [tags, setTags] = useState(noteData?.tags || []);
//   const [error, setError] = useState(null);

//   //   Edit Note
//   const editNote = async () => {
//     const noteId = noteData._id;
//     console.log(noteId);

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/note/edit/" + noteId,
//         { title, content, tags },
//         { withCredentials: true }
//       );

//       console.log(res.data);

//       if (res.data.success === false) {
//         console.log(res.data.message);
//         setError(res.data.message);
//         toast.error(res.data.message);
//         return;
//       }

//       toast.success(res.data.message);
//       getAllNotes();
//       onClose();
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error.message);
//       setError(error.message);
//     }
//   };

//   //   Add Note
//   const addNewNote = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/note/add",
//         { title, content, tags },
//         { withCredentials: true }
//       );

//       if (res.data.success === false) {
//         console.log(res.data.message);
//         setError(res.data.message);
//         toast.error(res.data.message);

//         return;
//       }

//       toast.success(res.data.message);
//       getAllNotes();
//       onClose();
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error.message);
//       setError(error.message);
//     }
//   };

//   const handleAddNote = () => {
//     if (!title) {
//       setError("Please enter the title");
//       return;
//     }

//     if (!content) {
//       setError("Please enter the content");
//       return;
//     }

//     setError("");

//     if (type === "edit") {
//       editNote();
//     } else {
//       addNewNote();
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
//         onClick={onClose}
//       >
//         <MdClose className="text-xl text-slate-400" />
//       </button>
//       <div className="flex gap-2 w-full">
//         <label className="input-label text-black text-2xl font-bold">
//           Title:
//         </label>
//         <input
//           type="text"
//           className="text-xl text-slate-950 outline-none border-b-2 w-full"
//           placeholder="Title of your card"
//           value={title}
//           onChange={({ target }) => setTitle(target.value)}
//         />
//       </div>
//       <div className="flex flex-col gap-2 mt-4">
//         <label className="input-label text-black text-2xl font-bold">
//           Content:
//         </label>

//         <textarea
//           type="text"
//           className="text-md text-slate-950 outline-none bg-slate-50 p-2 rounded"
//           placeholder="Content..."
//           rows={10}
//           value={content}
//           onChange={({ target }) => setContent(target.value)}
//         />
//       </div>

//       <div className="mt-3">
//         <label className="input-label text-black font-bold text-xl">
//           Tags:
//         </label>
//         <TagInput tags={tags} setTags={setTags} />
//       </div>

//       {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

//       <Button
//         onClick={handleAddNote}
//         className="btn-black font-medium mt-5 p-3"
//       >
//         {type === "edit" ? "UPDATE" : "ADD"}
//       </Button>
//     </div>
//   );
// };

// export default AddEditNotes;



import React, { useState } from "react";
import { MdClose, MdMic, MdMicOff } from "react-icons/md";
import TagInput from "@/components/Input/TagInput ";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Speech Recognition Setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (activeField === "title") {
        setTitle((prev) => prev + " " + transcript);
      } else if (activeField === "content") {
        setContent((prev) => prev + " " + transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      toast.error("Speech recognition error: " + event.error);
      setIsListening(false);
    };
  }

  const startListening = (field) => {
    if (!recognition) {
      toast.error("Speech Recognition not supported in this browser");
      return;
    }

    setActiveField(field);
    setIsListening(true);
    recognition.start();
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  // Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Title Input with Mic */}
      <div className="flex items-center gap-2 w-full">
        <label className="input-label text-black text-2xl font-bold">Title:</label>
        <input
          type="text"
          className="text-xl text-slate-950 outline-none border-b-2 w-full"
          placeholder="Title of your card"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content Input with Mic */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-black text-2xl font-bold">Content:</label>
        <div className="relative">
          <textarea
            className="text-md text-slate-950 outline-none bg-slate-50 p-2 rounded w-full"
            placeholder="Content..."
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <button
            className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full"
            onClick={() => startListening("content")}
          >
            {isListening && activeField === "content" ? (
              <MdMicOff className="text-red-500 text-2xl" />
            ) : (
              <MdMic className="text-green-500 text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Tags Input */}
      <div className="mt-3">
        <label className="input-label text-black font-bold text-xl">Tags:</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <Button onClick={handleAddNote} className="btn-black font-medium mt-5 p-3">
        {type === "edit" ? "UPDATE" : "ADD"}
      </Button>
    </div>
  );
};

export default AddEditNotes;
