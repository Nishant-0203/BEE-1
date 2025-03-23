import React from "react"
import { FaTags } from "react-icons/fa6"
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"
import moment from "moment"

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  backgroundColor, 
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className=" border rounded px-4 py-6 bg-white hover:shadow-xl transition-all ease-in-out" style={{ backgroundColor }}>
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-bold">{title}</h5>
          <span className="text-xs text-slate-700">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-[#2B85FF] " : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 240)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default NoteCard
