import { Router } from "express";
import categoryRouter from "./category.route.js";
import lessonRouter from "./lesson.route.js";
import courseRouter from "./course.route.js";
import sectionRouter from "./section.route.js";
import multerConfig from "../utils/multer.js";
import userRouter from "./user.route.js";
import couponRouter from "./coupon.route.js";
import levelRouter from "./level.route.js";

import endpoints from "../utils/endpoints.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import videoRouter from "./video.route.js";
import documentRouter from "./document.route.js";
import paymentRouter from "./payment.route.js";
import quizRouter from "./quiz.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const mainRouter = Router()

mainRouter.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../client/build', 'index.html'))
})


mainRouter.use(endpoints.COURSE, courseRouter)
mainRouter.use(endpoints.LEVEL, levelRouter)
mainRouter.use(endpoints.VIDEO, videoRouter)
mainRouter.use(endpoints.DOCUMENT, documentRouter)
mainRouter.use(endpoints.LESSON, multerConfig().array(''), lessonRouter)
mainRouter.use(endpoints.SECTION, multerConfig().array(''), sectionRouter)

mainRouter.use(endpoints.COUPON, multerConfig().array(''), couponRouter)
mainRouter.use(endpoints.PAYMENT, paymentRouter)
mainRouter.use(endpoints.CATEGORY, multerConfig().array(''), categoryRouter)
mainRouter.use(endpoints.QUIZ, quizRouter)
mainRouter.use(endpoints.USER, multerConfig().array(''), userRouter)




export default mainRouter