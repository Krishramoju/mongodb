import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', status: 'Present' });

  const getData = async () => {
    const res = await axios.get('http://localhost:5000/attendance');
    setAttendance(res.data);
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/attendance', form);
    setForm({ studentId: '', name: '', status: 'Present' });
    getData();
  };

  useEffect(() => { getData(); }, []);

  return (
    <div>
      <h2>Attendance Entry</h2>
      <form onSubmit={submit}>
        <input placeholder="ID" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} />
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Present</option>
          <option>Absent</option>
        </select>
        <button>Submit</button>
      </form>

      <h3>Attendance Records</h3>
      <ul>
        {attendance.map(a => (
          <li key={a._id}>{a.name} - {a.status} on {a.date.slice(0, 10)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
