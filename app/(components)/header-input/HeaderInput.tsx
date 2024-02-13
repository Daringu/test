import { Button, Container, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const HeaderInput: React.FC = () => {
    const [inputValue, setValue] = useState<string>('')
    const router = useRouter()

    const onClick = useCallback(() => {
        router.push(inputValue)
    }, [inputValue, router]);

    return (
        <Container className="">
            <TextField onChange={(e) => setValue(e.target.value)} value={inputValue} className=" w-[70%]" />
            <Button onClick={onClick} className=" w-[30%] h-[100%] bg-slate-950" variant="contained">Load</Button>
        </Container>)
}

export default HeaderInput