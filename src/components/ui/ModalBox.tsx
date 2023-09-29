import { Modal, Box } from "@mui/material";

export function ModalBox({ onClose, children }) {
    return <Modal onClose={onClose} open={true}>
        <Box sx={{ backgroundColor: 'white', width: '50vw', margin: '20px auto', padding: '25px 10px', borderRadius: '15px' }}>
            {children}
        </Box>
    </Modal>;
}
