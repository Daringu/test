import { Box, Button } from "@mui/material";
import { IAddCard } from "../types";

const AddCard: React.FC<IAddCard> = ({ handleClick }) => {
    return (
        <Box className=' w-[100%] pt-7 flex justify-center items-center'>
            <Button onClick={handleClick}> Add card </Button>
        </Box>
    )
}

export default AddCard