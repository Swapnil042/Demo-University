import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './StudentTable.module.css';

const StudentTable=(props)=> {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Student Id</TableCell>
            <TableCell>University</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.students.map((student, idx) => (
            <TableRow key={idx}>
                <TableCell component="th" scope="row">{student.student_name}</TableCell>
                <TableCell align="left">{student.student_email}</TableCell>
                <TableCell align="left">{student.student_phone_number}</TableCell>
                <TableCell align="left">{student.student_id}</TableCell>
                <TableCell align="left">{student.student_university_name}</TableCell>
                <TableCell align="left">{student.student_grade_level}</TableCell>
                <TableCell align="left">{student.student_created_by_user_id.first_name} {student.student_created_by_user_id.last_name}</TableCell>
                <TableCell align="left">
                    {student.student_updated_by_user_id ? `${student.student_updated_by_user_id.first_name} ${student.student_updated_by_user_id.last_name}`: '-------'}
                </TableCell>
                <TableCell align="left">
                    <button className={classes.button}>Edit</button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentTable;