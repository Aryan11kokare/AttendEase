const ClassroomsTab = ({
  classrooms,
  formData,
  setFormData,
  editingItem,
  handleAdd,
  handleDelete,
}) => {
  return (
    <>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">
          {editingItem ? "Edit Classroom" : "Add New Classroom"}
        </h3>
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            placeholder="Classroom Name (e.g., Grade 10-A)"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Classroom Branch (e.g., commers, science)"
            value={formData.branch}
            required
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                Branch
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {classrooms.map((classroom) => (
              <tr key={classroom._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{classroom.name}</td>
                <td className="px-6 py-4 text-center">{classroom.branch}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(classroom._id)}
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

export default ClassroomsTab;
