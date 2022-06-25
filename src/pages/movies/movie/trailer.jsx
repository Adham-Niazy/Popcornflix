import React from 'react';
import { Modal } from '@mui/material';

import useStyles from './styles';

function Trailer({ data, open, setOpen }) {
  const classes = useStyles();

  return (
    <Modal
      closeAfterTransition
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
    >
      {data?.videos?.results?.length > 0 && (
        <iframe
          title="trailer"
          className={classes.video}
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          allow="autoplay"
        />
      )}
    </Modal>
  );
}

export default Trailer;
