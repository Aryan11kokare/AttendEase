import { Check, Plus } from "lucide-react";

const StudentsTab = ({
  students,
  classrooms,
  formData,
  setFormData,
  editingItem,
  handleAdd,
  handleDelete,
}) => {
  const handleAssing = (studnet) => {
    setFormData({
      ...formData,
      name: studnet.username,
      email: studnet.email,
      roll_number: studnet.rollNo,
      studentId: studnet._id,
    });
  };
  return (
    <>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">
          {editingItem ? "Edit Student" : "Add New Student"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Student Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={formData.roll_number}
            onChange={(e) =>
              setFormData({ ...formData, roll_number: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={formData.classroom_id}
            onChange={(e) =>
              setFormData({ ...formData, classroom_id: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Classroom</option>
            {classrooms.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Into Class
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Roll No
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Classroom
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((student) => {
              return (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{student.rollNo}</td>
                  <td className="px-6 py-4">{student.username}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">
                    {student?.classRoom?.name || "undefind"}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center gap-4 justify-end space-x-2">
                    <button
                      onClick={() => handleAssing(student)}
                      className="text-blue-600 hover:text-blue-800  font-medium"
                    >
                      <Plus />
                    </button>
                    <button
                      onClick={() => handleDelete(student)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentsTab;
