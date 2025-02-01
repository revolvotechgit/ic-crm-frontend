import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const CodeInput = styled(CustomTextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    width: '50px',
    height: '50px',
    padding: '0',
    fontSize: '24px',
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.background.paper,
  },
  '& .MuiOutlinedInput-root': {
    marginRight: '8px',
    marginLeft: '8px',
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const AuthResetCode = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 1 && /^[0-9A-Z]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase().slice(0, 6);
    const pastedChars = pastedData.split('').filter((char) => /^[0-9A-Z]$/.test(char));

    const newCode = [...code];
    pastedChars.forEach((char, index) => {
      if (index < 6) {
        newCode[index] = char;
      }
    });
    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((char) => !char);
    if (nextEmptyIndex !== -1) {
      inputs.current[nextEmptyIndex].focus();
    } else {
      inputs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetCode = code.join('');
    console.log('Reset Code:', resetCode);
    navigate('/auth/login');
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box mt={4}>
        <Typography variant="h6" fontWeight="400" mb={3}>
          Enter 6 character verification code
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={0.5} justifyContent="center" mb={2}>
            {code.map((char, index) => (
              <CodeInput
                key={index}
                inputRef={(el) => (inputs.current[index] = el)}
                variant="outlined"
                size="small"
                value={char}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                autoFocus={index === 0}
                autoComplete="off"
                inputProps={{
                  maxLength: 1,
                  style: { padding: 0 },
                }}
              />
            ))}
          </Stack>

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={code.some((char) => !char)}
          >
            Verify Code
          </Button>
        </form>
      </Box>

      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Typography color="textSecondary">Didn't receive the code?</Typography>
        <Typography
          component="span"
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 500,
          }}
          onClick={() => {
            console.log('Resend code');
          }}
        >
          Resend
        </Typography>
      </Stack>

      {subtitle}
    </>
  );
};

export default AuthResetCode;
