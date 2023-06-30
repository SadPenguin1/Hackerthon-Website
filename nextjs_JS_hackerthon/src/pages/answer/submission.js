
import React, { useEffect, useState } from 'react';
// next
import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { dispatch, useDispatch, useSelector } from '../../redux/store';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';
import Scrollbar from 'src/components/Scrollbar';
import Iconify from 'src/components/Iconify';
// @mui
import { styled } from '@mui/material/styles';
import { getAnswers } from 'src/redux/slices/hackerthon/hackerthon.answer';
// ----------------------------------------------------------------------

// --------------------------------------------------------------------
const RootStyle = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
});


const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
    '& > p': {
        ...theme.typography.body1,
        marginBottom: theme.spacing(2)
    },
}));

AnswerList.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};

export default function AnswerList({ answer }) {
    const dispatch = useDispatch();

    let router = useRouter();
    const { id } = router.query;

    const { answers, search } = useSelector((state) => state.hackerthonAnswer);
    console.log(answers)

    const { exercise } = useSelector((state) => state.hackerthonExercise);

    useEffect(() => {
        dispatch(getAnswers());
    }, [search]);

    useEffect(() => {
        dispatch(getExercise(id));
    }, []);

    const filteredAnswers = answers.filter(answer => answer.exercise && answer.exercise.id === parseInt(id));
    console.log(filteredAnswers)

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'createAt', label: 'Date', minWidth: 70 , align: 'center',},
        
        {
          id: 'verdict',
          label: 'Result',
          minWidth: 70,
          align: 'center',
         
        },
        {
          id: 'averageExecutionDuration',
          label: 'Time',
          minWidth: 50,
          align: 'center',
        },
        {
            id: 'language',
            label: 'Language',
            minWidth: 70,
            align: 'center',
          },
      ];
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return (
        <RootStyle>
            <Grid item xs={12}>
                <Card>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredAnswers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((answer) => {
                                            const verdictColor = getVerdictColor(answer.verdict);
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={answer.code}>
                                                    {columns.map((column) => {
                                                        const value = answer[column.id]
                                                        const cellStyle = column.id === 'verdict' ? { color: verdictColor ,fontWeight: 'bold'}  : {};
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={cellStyle}>
                                                                    {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={filteredAnswers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Card>
            </Grid>
        </RootStyle>
    );
}

function getVerdictColor(verdict) {
    switch (verdict) {
      case 'Accepted':
        return 'green'; 
      case 'Wrong Answer':
        return 'red'; 
      case 'Compilation Error':
        return 'orange';
      default:
        return 'black'; 
    }
  }