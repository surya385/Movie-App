import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { api } from '../config/config';
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius:'6px',
    boxShadow: 24,
  p: 1,
};

export default function MovieModal({open,handleClose,data}) {
    console.log(data)
  return (
    <div className='modal'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={`${api.movieImage}${data.backdrop_path}`}
                alt={`Movie name : ${data.title} - (Image Not Found)`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Release Date:{data.release_date}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Rating:{data.vote_average}
                </Typography>
                <hr></hr>
                <Typography variant="body2" color="text.secondary">
                  {data.overview}
                </Typography>
              </CardContent>
              <button className="cancel_icon" onClick={handleClose}>
                <CloseIcon />
              </button>
            </CardActionArea>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
