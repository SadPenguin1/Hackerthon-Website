
import { useEffect, useState } from 'react';
// next
import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';
import Scrollbar from 'src/components/Scrollbar';
import Iconify from 'src/components/Iconify';
// @mui
import { styled } from '@mui/material/styles';



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
export default function Cauhoi() {
  const dispatch = useDispatch();
  const [close, setClose] = useState(false)
  let router = useRouter();
  router.query.id

   const [selectID, setSelectId] = useState();
  // const [close1,setClose1]=useState("")
  const { exercises, search } = useSelector((state) => state.hackerthonExercise);
  const { exercise, id } = useSelector((state) => state.hackerthonExercise);

  
  useEffect(() => {
    dispatch(getExercises());
  }, [search]);

  // const handleOpen=()=>{
  //   setClose(true)
  // }
  const handleOpen = (id) => { 
    setSelectId(id); // Cập nhật selectedItemId khi bấm vào item
    setClose(true);
    console.log(id)
  };

  const handleClose = () => {
    // setClose(!close)
  }
  // console.log(close1);
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="list of problems" />

        <Scrollbar>
          {(close) ? <ExerciseDetails id={7} /> :
            <Stack onClick={() => handleOpen()} spacing={3} sx={{ p: 3, pr: 0 }}>
              {exercises.map((exercise) => (
                <ExerciseItem key={exercise.id} exercise={exercise}  />
              ))}
            </Stack>}
        </Scrollbar>

        <Divider />
      </Card>
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Grid>

  );
}
function ExerciseDetails({ id, handleClose }) {
  const { exercises, search } = useSelector((state) => state.hackerthonExercise);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(getExercises());
  // }, [search]);
  // const item = exercises.find(element => element.id === id);
  const item = exercises.find(exercise => exercise.id === id);
  // const item = exercises.find(element => element.id === selectedItemId);
  console.log(item)
  console.log(id)
  return (
    <RootStyle>
      {/* <MailDetailsToolbar mail={item} /> */}
      <Divider />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>           
            {item.title}
          </Typography>
          <MarkdownWrapperStyle>
            <Markdown children={item.description} />
            <Markdown children={item.input} />
            <Markdown children={item.output} />

          </MarkdownWrapperStyle>
        </Box>
      </Scrollbar>

      {/* {isAttached && <MailDetailsAttachments mail={mail}  />} */}
      <Divider />
      {/* <Typography onClick={handleClose}>Close</Typography> */}
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>

          <Link href="/answer">Do </Link>

        </Button>
      </Box>
      {/* <MailDetailsReplyInput /> */}
    </RootStyle>
  );
}
function ExerciseItem({ exercise }) {
  const { id, title, description, postedAt, input , output } = exercise;
  const { exercises, search } = useSelector((state) => state.hackerthonExercise);



  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* <Image alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} /> */}
      <Typography variant="subtitle2">{id}</Typography>
      <Box sx={{ minWidth: 240 }}>
        <Link color="inherit">
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
        </Link>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap dangerouslySetInnerHTML={{__html: description}}> 
            {description}
          </Typography>  */}
      </Box>
      {/* <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {fToNow(postedAt)}
        </Typography> */}

    </Stack>

  );
}