import React, { useEffect } from 'react';
import { fetchBlogPost } from 'src/store/apps/blog/BlogSlice';
import { useLocation } from 'react-router';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Tooltip,
  Box,
  Divider,
  TextField,
  Button,
  Skeleton,
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint, IconQuote } from '@tabler/icons-react';
import { format } from 'date-fns';
import BlogComment from './BlogComment';
import { uniqueId } from 'lodash';
import { addComment } from 'src/store/apps/blog/BlogSlice';
import BlankCard from '../../../shared/BlankCard';
import { useDispatch, useSelector } from 'react-redux';

// Simple markdown to HTML converter
const markdownToHtml = (markdown) => {
  if (!markdown) {
    console.log('No markdown content provided');
    return '<p>No content available</p>';
  }

  console.log('Converting markdown, length:', markdown.length);

  let html = markdown
    // Headers (must be at start of line)
    .replace(/^### (.+)$/gim, '<h3>$1</h3>')
    .replace(/^## (.+)$/gim, '<h2>$1</h2>')
    .replace(/^# (.+)$/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic (but not bold)
    .replace(/\*(?!\*)(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs
    .split('\n\n')
    .map(para => para.trim())
    .filter(para => para.length > 0)
    .map(para => {
      // Don't wrap if already wrapped in heading
      if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol')) {
        return para;
      }
      return `<p>${para.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
};

const BlogDetail = () => {
  const dispatch = useDispatch();
  const title = useLocation();
  const getTitle = title.pathname.split('/').pop();
  const [replyTxt, setReplyTxt] = React.useState('');

  useEffect(() => {
    dispatch(fetchBlogPost(getTitle));
  }, [dispatch]);

  // Get post
  const post = useSelector((state) => state.blogReducer.selectedPost);

  // Debug logging
  useEffect(() => {
    if (post) {
      console.log('Post loaded:', post.title);
      console.log('Content length:', post.content?.length || 0);
      console.log('Content preview:', post.content?.substring(0, 100));
    }
  }, [post]);
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/apps/blog/posts',
      title: 'Blog',
    },
    {
      title: 'Blog post',
    },
  ];

  const onSubmit = async (id, reply) => {
    const replyId = uniqueId('#comm_');
    const newReply = {
      id: replyId,
      profile: {
        id: uniqueId('#REPLY_'),
        avatar: post?.author.avatar,
        name: post?.author.name,
        time: 'now',
      },
      comment: reply,
      replies: [],
    };
    dispatch(addComment(id, newReply));
    dispatch(fetchBlogPost(getTitle));
    setReplyTxt('');
  };

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <BlankCard>
        <>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                variant="square"
                width="100%"
                height={440}
                sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
              ></Skeleton>
            </>
          ) : (
            <CardMedia component="img" height="440" image={post?.coverImg} alt="green iguana" />
          )}
          <CardContent>
            <Stack direction="row" sx={{ marginTop: '-45px' }}>
              <Tooltip title={post ? post?.author.name : ''} placement="top">
                <Avatar aria-label="recipe" src={post?.author.avatar}></Avatar>
              </Tooltip>
              <Chip
                sx={{ marginLeft: 'auto', marginTop: '-21px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.dark : 'white', }}
                label="2 min Read"
                size="small"
              ></Chip>
            </Stack>
            <Chip label={post?.category} size="small" sx={{ marginTop: 2 }}></Chip>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h1"
                fontWeight={600}
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                {post?.title}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {post?.view}
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconMessage2 size="18" /> {post?.comments.length}
              </Stack>

              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                <small>{post ? <>{format(new Date(post.createdAt), 'E, MMM d')}</> : ''}</small>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardContent>
            <Box
              sx={{
                '& h1': {
                  fontSize: '2rem',
                  fontWeight: 700,
                  mt: 4,
                  mb: 2,
                  color: 'text.primary'
                },
                '& h2': {
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                  color: 'text.primary'
                },
                '& h3': {
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  mt: 3,
                  mb: 1.5,
                  color: 'text.primary'
                },
                '& p': {
                  mb: 2,
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  color: 'text.secondary'
                },
                '& ul, & ol': {
                  mb: 2,
                  pl: 4,
                  '& li': {
                    mb: 1,
                    lineHeight: 1.7
                  }
                },
                '& code': {
                  backgroundColor: 'grey.100',
                  color: 'primary.main',
                  padding: '2px 8px',
                  borderRadius: 1,
                  fontFamily: 'Consolas, Monaco, monospace',
                  fontSize: '0.9em'
                },
                '& pre': {
                  backgroundColor: 'grey.100',
                  padding: 2,
                  borderRadius: 2,
                  overflow: 'auto',
                  mb: 3,
                  '& code': {
                    backgroundColor: 'transparent',
                    padding: 0,
                    color: 'text.primary'
                  }
                },
                '& strong': {
                  fontWeight: 600,
                  color: 'text.primary'
                },
                '& em': {
                  fontStyle: 'italic'
                },
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }
              }}
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post?.content) }}
            />
          </CardContent>
        </>
      </BlankCard>
      <BlankCard sx={{ mt: 3, p: 0 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={600}>
            Post Comments
          </Typography>
          <br />
          <TextField
            rows={4}
            multiline
            fullWidth
            value={replyTxt}
            onChange={(e) => setReplyTxt(e.target.value)}
          ></TextField>
          <br />
          <br />
          <Button color="primary" variant="contained" onClick={() => onSubmit(post.id, replyTxt)}>
            Post Comment
          </Button>

          <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
            <Typography variant="h4" fontWeight={600}>
              Comments
            </Typography>
            <Box px={1.5} py={1} color="primary.main" bgcolor={'primary.light'}>
              <Typography variant="h6" fontWeight={600}>
                {post?.comments.length}
              </Typography>
            </Box>
          </Stack>
          <Box>
            {post?.comments?.map((comment) => {
              return <BlogComment comment={comment} key={comment.profile.id} />;
            })}
          </Box>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default BlogDetail;
