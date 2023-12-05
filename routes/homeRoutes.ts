import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "Folklof - The Story Teller Platform as an Innovative Educational Tool to Support the SDGs",
    copyright: '© 2023. HanCeSi Group.'
  });
});

export default router;
