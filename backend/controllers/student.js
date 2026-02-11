import { Attendance } from "../modles/attendanceSchema.js";

export const getMyAttendace = async (req, res) => {
  try {
    const student = req.user;
    const attendances = await Attendance.find({
      "records.student": student._id,
    })
      .populate("subject", "name")
      .populate("classRoom", "name");

    // compute per-subject totals
    const summary = {};
    const monthly = {};
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalClasses = 0;
    attendances.forEach((a) => {
      const subj = a.subject.name;
      if (!summary[subj]) summary[subj] = { total: 0, present: 0 };
      if (!monthly[subj]) monthly[subj] = [];
      const rec = a.records.find(
        (r) => r.student.toString() === student._id.toString(),
      );
      if (rec) {
        summary[subj].total += 1;
        totalClasses += 1;

        monthly[subj].push({
          date: a.date,
          status: rec.status,
        });
        if (rec.status === "Present") summary[subj].present += 1;
        if (rec.status === "Present") totalPresent += 1;
        if (rec.status === "Absent") totalAbsent += 1;
      }
    });

    const attendancePercentage =
      totalClasses > 0 ? ((totalPresent / totalClasses) * 100).toFixed(2) : 0;

    res.json({
      attendances,
      summary,
      monthly,
      totalAbsent,
      totalPresent,
      totalClasses,
      attendancePercentage,
    });
  } catch (e) {
    console.log(e);
  }
};
