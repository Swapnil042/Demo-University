import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './CourseTable.module.css';

const CourseTable=(props)=> {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Title</TableCell>
            <TableCell>Course Id</TableCell>
            <TableCell>Course Description</TableCell>
            <TableCell>Course Price</TableCell>
            <TableCell>Course Rating</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((course, idx) => (
            <TableRow key={idx}>
                <TableCell component="th" scope="row">{course.course_title}</TableCell>
                <TableCell align="left">{course.course_id}</TableCell>
                <TableCell align="left">{course.course_description}</TableCell>
                <TableCell align="left">{course.course_price}</TableCell>
                <TableCell align="left">{course.course_rating}</TableCell>
                <TableCell align="left">{course.course_created_by_user_id.first_name} {course.course_created_by_user_id.last_name}</TableCell>
                <TableCell align="left">
                    {course.course_updated_by_user_id ? `${course.course_updated_by_user_id.first_name} ${course.course_updated_by_user_id.last_name}`: '-------'}
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

export default CourseTable;