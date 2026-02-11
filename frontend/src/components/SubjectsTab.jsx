import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubjects,
  getClassroomById,
} from "../../redux/actions/authActions";

const SubjectsTab = ({
  subjects,
  formData,
  setFormData,
  editingItem,
  handleAdd,
  handleDelete,
  classrooms,
}) => {
  const classState = useSelector((state) => state.classroom);
  const [classS, setClassS] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  useEffect(() => {
    setClassS(classState.classRoom);
  }, [classState.classRoom]);

  return (
    <>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">
          {editingItem ? "Edit Subject" : "Add New Subject"}
        </h3>
        <form onSubmit={handleAdd}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Subject Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Subject code"
              required
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={formData.classroom_id}
              required
              onChange={(e) => {
                setFormData({ ...formData, classroom_id: e.target.value });
                dispatch(getClassroomById({ classroomId: e.target.value }));
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
            <select
              value={formData.teacher}
              required
              onChange={(e) =>
                setFormData({ ...formData, teacher: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Teacher</option>
              {classS?.teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.username}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                code
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Teacher
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subjects?.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{subject?.name}</td>
                <td className="px-6 py-4">{subject?.code}</td>
                <td className="px-6 py-4">{subject?.teacher?.username}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubjectsTab;
