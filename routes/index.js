import { Router } from 'express';
import { getMegaLink, streamFile } from '../controllers/MainController.js';
const router = Router();

const tempFunc = (set, func) => {
  if (set) {
    router.Reusable = func
  } else {
    return router.Reusable
  }
}

router.get('/link', (req, res) => getMegaLink(req, res, tempFunc))
router.get('/download/:id', (req, res) => streamFile(req, res, tempFunc))



export default router;
