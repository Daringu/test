'use client'

import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ioClient } from "./(API)/io";

interface DataDTO {
  id: string
}

export default function Home() {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [referal, setReferal] = useState<string | null>(null)
  useEffect(() => {
    ioClient.on('board-created', (data: DataDTO) => {
      setReferal(data.id)
    })
  }, [])
  const onClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const createBoard = () => {
    ioClient.emit('create-board')
  }
  return (<>
    <Modal className=" flex items-center justify-center" onBackdropClick={onClose} open={isOpen} onClose={() => onClose}><Box className=" flex items-center content-center bg-white">
      {referal && <Typography>{referal}</Typography>}
      <Button onClick={createBoard}>create board</Button>
    </Box>
    </Modal>
    <Typography className=" text-center">Search or <Button onClick={onClick} variant='text'>create a board</Button></Typography>
  </>
  );
}
