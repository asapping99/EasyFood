import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ username, password });
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });
    if (res.ok) {
      const user = await res.json();
      onLogin(user);
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>로그인</Typography>
      <form onSubmit={submit}>
        <TextField fullWidth label="ID" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField fullWidth label="비밀번호" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>로그인</Button>
      </form>
    </Container>
  );
}

export default LoginPage;
