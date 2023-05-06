import React from 'react'
import { forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ErrorPopup = forwardRef(function ErrorPopup(props, errorPopupRef) {


    const [alert, setAlert] = React.useState( {
            type: 'error',
            text: 'Something went wrong',
            open: false
        });

    useImperativeHandle(errorPopupRef, () => {

        return {
            onShowAlert(type, text) {
                console.log("type", type, text);
                setAlert({
                type: type,
                text,
                open: true
                })
            }
        }
    }, []);

    function onCloseAlert() {
        setAlert({
        type: '',
        text: '',
        open: false
        })
    }


    return (
        <div>
          {/* <Button onClick={onShowAlert}>Open modal</Button> */}
          <Modal
            open={alert?.open}
            onClose={onCloseAlert}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" color={"red"}>
              {alert?.type || "Error"}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {alert?.text}
              </Typography>
            </Box>
          </Modal>
        </div>
      );
});

export default ErrorPopup;