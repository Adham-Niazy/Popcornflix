import React from 'react';
import { Button, Typography } from '@mui/material';

import useStyles from './styles';

function Pagination({ page, totalPages, setPage }) {
  const classes = useStyles();
  const showMax = false;
  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)} className={classes.button} variant="contained" color="primary" type="button">Prev</Button>
      <Typography variant="h5" className={classes.pageNumber}>{page}{showMax ? ` / ${totalPages}` : null}</Typography>
      <Button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)} className={classes.button} variant="contained" color="primary" type="button">Next</Button>
    </div>
  );
}

export default Pagination;
