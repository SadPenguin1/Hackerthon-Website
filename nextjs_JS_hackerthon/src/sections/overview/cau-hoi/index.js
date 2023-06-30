// import { useEffect, useState } from 'react';
// // next
// import { useRouter } from 'next/router';
// import { Box, Stack,Grid, Container, Accordion, Typography,Button,Divider,Link, AccordionSummary, AccordionDetails, Card,CardHeader } from '@mui/material';
// import { useDispatch ,useSelector} from '../../../redux/store';

// // hooks
// import useSettings from '../../../../hooks/useSettings';
// // layouts
// import Layout from '../../../../layouts';
// // @mui
// import { styled } from '@mui/material/styles';
// // components
// import Page from '../../../../components/Page';
// import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

// // sections
// import { MailList, MailDetails, MailSidebar, MailCompose } from '../../../../../sections/@dashboard/mail';

// // ----------------------------------------------------------------------

// // ----------------------------------------------------------------------
// const RootStyle = styled('div')({
//   flexGrow: 1,
//   display: 'flex',
//   flexDirection: 'column',
// });

// const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
//   '& > p': {
//     ...theme.typography.body1,
//     marginBottom: theme.spacing(2),
//   },
// }));
// export default function Cauhoi() {
//     const dispatch = useDispatch();
//     const [isCheck,setIsCheck]=useState(false)
//     const { exercises, search} = useSelector((state) => state.hackerthonExercise);
//     useEffect(() => {
//       dispatch(getExercises());
//     }, [search]);
//   const handleOpen=()=>{
//     setIsCheck(true)
//   }
//     function QuestionDetails({id}) {
//         const handleOpen=()=>{
//             setIsCheck(false)
//           }
//         const item = exercises.find(element => element.id ===id);
      
//         return (
//           <RootStyle>
//             {/* <MailDetailsToolbar mail={item} /> */}
//             <Divider />
      
//             <Scrollbar sx={{ flexGrow: 1 }}>
//               <Box sx={{ p: { xs: 3, md: 5 } }}>
//                 <Typography variant="h3" gutterBottom>
//                   {item.title}
//                 </Typography>
//                 <MarkdownWrapperStyle>
//                   <Markdown children={{item.title}} />
//                 </MarkdownWrapperStyle>
//               </Box>
//             </Scrollbar>
      
//             {/* {isAttached && <MailDetailsAttachments mail={mail}  />} */}
      
//             <Divider />
//             <Typography onClick={()=>handleClose()}>Close</Typography>
//             <MailDetailsReplyInput />
//           </RootStyle>
//         );
//       }
//     return (
//       <Grid item xs={9}>
//       <Card>
//         <CardHeader title="list of problems" />
  
//         <Scrollbar>
//         {isCheck ? <QuestionDetails /> :<Stack spacing={3} sx={{ p: 3, pr: 0 }}>
//             {exercises.map((news) => (
//               <NewsItem key={news.id} news={news} onClick={()=>handleOpen()}/>
//             ))}
//           </Stack>}
//         </Scrollbar>
  
//         <Divider />
  
//         <Box sx={{ p: 2, textAlign: 'right' }}>
//           <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
//             View all
//           </Button>
//         </Box>
//       </Card>
//        </Grid>
      
//     );
//   }
//   function NewsItem({ news }) {
//     const { id, title, description, postedAt } = news;
//     return (
//       <Stack direction="row" alignItems="center" spacing={2}>
//         {/* <Image alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} /> */}
//         <Typography  variant="subtitle2">{id}</Typography>
//         <Box sx={{ minWidth: 240 }}>
//           <Link color="inherit">
//             <Typography variant="subtitle2" noWrap>
//               {title}
//             </Typography>
//           </Link>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap dangerouslySetInnerHTML={{__html: description}}>
//             {description}
//           </Typography>
//         </Box>
//         {/* <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
//           {fToNow(postedAt)}
//         </Typography> */}
//         <Box sx={{ p: 2, textAlign: 'right' }}>
//           <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
//             View all
//           </Button>
//         </Box> 
//       </Stack>
//     );
//   }