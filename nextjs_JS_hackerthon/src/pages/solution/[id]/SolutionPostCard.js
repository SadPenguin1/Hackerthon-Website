import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
  Grid,
} from '@mui/material';
// hooks
// import useAuth from '../../../../hooks/useAuth';
// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fShortenNumber } from '../../../../utils/formatNumber';
// components
// import Image from '../../../../components/Image';
// import Iconify from '../../../../components/Iconify';
// import MyAvatar from '../../../../components/MyAvatar';
// import EmojiPicker from '../../../../components/EmojiPicker';
import { fDate } from 'src/utils/formatTime';
import { fShortenNumber } from 'src/utils/formatNumber';
import Image from 'src/components/Image';
import Iconify from 'src/components/Iconify';
import EmojiPicker from 'src/components/EmojiPicker';
import MyAvatar from 'src/components/MyAvatar';
import { getSolutions } from 'src/redux/slices/hackerthon/hackerthon.solution';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';


// ----------------------------------------------------------------------

// SolutionPostCard.propTypes = {
//   solution: PropTypes.object,
// };

export default function SolutionPostCard() {
  // const { user } = useAuth();
  const dispatch = useDispatch();

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const { solutions, search } = useSelector((state) => state.hackerthonSolution)

  const [isLiked, setLiked] = useState();

  // const [likes, setLikes] = useState(solution.personLikes.length);

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getSolutions())
  }, [search]);

  console.log(solutions)

  // const hasComments = solution.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Grid container spacing={2}>
      <Paper>
      <Scrollbar sx={{ flexGrow: 1 }}>
      {solutions.map((solution) => (
        <Card>

          {/* <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link variant="subtitle2" color="text.primary">
            {user?.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(solution.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      /> */}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography>{solution?.content}</Typography>

            {/* <Image alt="solution media" src={solution.media} ratio="16/9" sx={{ borderRadius: 1 }} /> */}

            <Stack direction="row" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="error"
                     checked={isLiked}
                    icon={<Iconify icon={'eva:heart-fill'} />}
                    checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                   onChange={isLiked ? handleUnlike : handleLike}
                  />
                }
              label={fShortenNumber(likes)}
              sx={{ minWidth: 72, mr: 0 }}
              />
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                {/* {solution.personLikes.map((person) => (
                  <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
                ))} */}
              </AvatarGroup>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={handleClickComment}>
                <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
              </IconButton>
              <IconButton>
                <Iconify icon={'eva:share-fill'} width={20} height={20} />
              </IconButton>
            </Stack>

            {/* {hasComments && (
          <Stack spacing={1.5}>
            {solution.comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )} */}

            <Stack direction="row" alignItems="center">
              <MyAvatar />
              <TextField
                fullWidth
                size="small"
                value={message}
                inputRef={commentInputRef}
                placeholder="Write a comment…"
                onChange={(event) => handleChangeMessage(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleClickAttach}>
                        <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
                      </IconButton>
                      <EmojiPicker alignRight value={message} setValue={setMessage} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ml: 2,
                  mr: 1,
                  '& fieldset': {
                    borderWidth: `1px !important`,
                    borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
                  },
                }}
              />
              <IconButton>
                <Iconify icon={'ic:round-send'} width={24} height={24} />
              </IconButton>
              {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} /> */}
            </Stack>
          </Stack>

        </Card>
      ))}
      </Scrollbar>
      </Paper>
    </Grid>

  );
}
