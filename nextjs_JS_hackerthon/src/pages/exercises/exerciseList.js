
// import { useEffect, useState } from 'react';
// // next
// import Markdown from '../../components/Markdown';
// import { useRouter } from 'next/router';
// import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader } from '@mui/material';
// import { useDispatch, useSelector } from '../../redux/store';
// import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';
// import Scrollbar from 'src/components/Scrollbar';
// import Iconify from 'src/components/Iconify';
// // @mui
// import { styled } from '@mui/material/styles';
// // ----------------------------------------------------------------------

// // --------------------------------------------------------------------
// const RootStyle = styled('div')({
//   flexGrow: 1,
//   display: 'flex',
//   flexDirection: 'column',
// });


// const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
//   '& > p': {
//     ...theme.typography.body1,
//     marginBottom: theme.spacing(2)
//   },
// }));

// Cauhoi.getLayout = function getLayout(page) {
//   return <Layout variant="main">{page}</Layout>;
// };

// export default function Cauhoi() {
//   const dispatch = useDispatch();

//   let router = useRouter();
//   router.query.id

//   const { exercises, search } = useSelector((state) => state.hackerthonExercise);
//   const { exercise, id } = useSelector((state) => state.hackerthonExercise);


//   useEffect(() => {
//     dispatch(getExercises());
//   }, [search]);
//   console.log(exercises)

//   return (
//     <RootStyle>
//       <Grid item xs={12}>
//         <Card>
//           <CardHeader title="list of problems" />

//           <Scrollbar>
//             <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
//               {exercises.map((exercise) => (
//                 <ExerciseItem key={exercise.id} exercise={exercise} />
//               ))}
//             </Stack>
//           </Scrollbar>

//           <Divider />
//         </Card>
//       </Grid>
//     </RootStyle>
//   );
// }

// function ExerciseItem({ exercise }) {
//   const { id, title, description, postedAt, input, output } = exercise;
//   const { exercises, search } = useSelector((state) => state.hackerthonExercise);

//   return (
//     <Link  href={`/exercises/${id}`} >
//       <Stack direction="row" alignItems="center" spacing={2}>
//         {/* <Image alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} /> */}
//         <Typography variant="subtitle2">{id}</Typography>
//         <Box sx={{ minWidth: 240 }}>

//           <Typography variant="subtitle1" noWrap>
//             {title}
//           </Typography>

//         </Box>
//       </Stack>
//       </Link>
//   );
// }