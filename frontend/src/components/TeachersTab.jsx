import React from "react";

const TeachersTab = ({
  teachers,
  formData,
  setFormData,
  editingItem,
  handleAdd,
  classrooms,
  handleUpdate,
  handleEdit,
  handleDelete,
}) => {
  const handleAssing = (teacher) => {
    setFormData({
      ...formData,
      name: teacher.username,
      teacherId: teacher._id,
    });
  };
  return (
    <>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">
          {editingItem ? "Edit Teacher" : "Add New Teacher"}
        </h3>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
        >
          <input
            type="text"
            placeholder="Teacher Name"
            required
            value={formData.name}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={formData.classroom_id}
            required
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
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Assign
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
                Email
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{teacher.username}</td>
                <td className="px-6 py-4">{teacher.email}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleAssing(teacher)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Add
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

export default TeachersTab;
