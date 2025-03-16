import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Stack direction="row" overflow={'hidden'}>
      <CircularProgress color="secondary" />
    </Stack>
  );
}
