import express from 'express';
import swaggerUI from 'swagger-ui-express';

import config from '../../../config/secrets';
import specification from './specification.json';
const router = express.Router();
router.use(
    swaggerUI.serve,
    swaggerUI.setup({
        ...specification,
        servers: [{ url: `${config.baseUrl}/api/v1/sw` }]
    })
);

export default router;
