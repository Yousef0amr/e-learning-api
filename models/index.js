import sequelize from './../config/database_config.js';
import UserModel from './User.js';
import CategoryModel from './Category.js';
import CourseModel from './Course.js';
import SectionModel from './Section.js';
import LessonModel from './Lesson.js';
import VideoModel from './Video.js';
import QuizModel from './Quiz.js';
import QuestionModel from './Question.js';
import CourseCategoryModel from './CourseCategory.js';
import DocumentModel from './Document.js';
import EnrollmentModel from './Enrollment.js';
import CouponModel from './Coupon.js';
import LevelModel from './Level.js';
import PaymentModel from './Payment.js';
import QuizResultModel from './QuizResult.js';
import NoteModel from './Note.js';
import ChargeCodeModel from './ChargeCode.js';
import CourseProgressModel from './CourseProgress.js';
import LessonProgressModel from './LessonProgress.js';
import LessonQuestionModel from './LessonQuestion.js';
import LessonAnswerModel from './LessonAnswer.js';


const User = UserModel(sequelize);
const Level = LevelModel(sequelize);
const Category = CategoryModel(sequelize);
const Course = CourseModel(sequelize);
const Section = SectionModel(sequelize);
const Lesson = LessonModel(sequelize);
const Video = VideoModel(sequelize);
const Quiz = QuizModel(sequelize);
const Question = QuestionModel(sequelize);
const Document = DocumentModel(sequelize);
const Enrollment = EnrollmentModel(sequelize);
const Coupon = CouponModel(sequelize);
const CourseCategory = CourseCategoryModel(sequelize);
const Payment = PaymentModel(sequelize);
const QuizResult = QuizResultModel(sequelize);
const Note = NoteModel(sequelize);
const ChargeCode = ChargeCodeModel(sequelize);
const CourseProgress = CourseProgressModel(sequelize);
const LessonProgress = LessonProgressModel(sequelize);
const LessonQuestion = LessonQuestionModel(sequelize);
const LessonAnswer = LessonAnswerModel(sequelize);

// Define associations



// Course associations
Course.hasMany(Coupon, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Coupon.belongsTo(Course, { foreignKey: 'course_id' });




Course.belongsToMany(Category, { through: CourseCategory, foreignKey: 'course_id', onDelete: 'CASCADE' });
Category.belongsToMany(Course, { through: CourseCategory, foreignKey: 'category_id' });

Course.hasMany(Section, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Section.belongsTo(Course, { foreignKey: 'course_id' });

Level.hasMany(Category, { foreignKey: 'level_id', onDelete: 'CASCADE' });
Category.belongsTo(Level, { foreignKey: 'level_id' });

// Section associations
Section.hasMany(Lesson, { foreignKey: 'section_id', onDelete: 'CASCADE' });
Lesson.belongsTo(Section, { foreignKey: 'section_id' });

// Lesson associations
Lesson.hasMany(Video, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE',
    as: 'videos'
});
Video.belongsTo(Lesson, {
    foreignKey: 'lesson_id',
    as: 'lesson'
});

Lesson.hasMany(Quiz, { foreignKey: 'lesson_id', onDelete: 'CASCADE', as: 'quizzes' });
Quiz.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });


Lesson.hasMany(Note, { foreignKey: 'lesson_id', onDelete: 'CASCADE', as: 'notes' });
Note.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });

Lesson.hasOne(LessonProgress, { foreignKey: 'lesson_id', onDelete: 'CASCADE', as: 'lessonProgress' });
LessonProgress.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });

Lesson.hasMany(LessonQuestion, { foreignKey: 'lesson_id', onDelete: 'CASCADE', as: 'lessonQuestions' });
LessonQuestion.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });


LessonQuestion.hasMany(LessonAnswer, { foreignKey: 'lesson_question_id', onDelete: 'CASCADE', as: 'lesson_answers' });
LessonAnswer.belongsTo(LessonQuestion, { foreignKey: 'lesson_question_id', as: 'lesson_questions' });

Lesson.hasMany(Document, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE',
    as: 'documents'
});
Document.belongsTo(Lesson, {
    foreignKey: 'lesson_id',
    as: 'lesson'
});

// Quiz associations
Quiz.hasMany(Question, { foreignKey: 'quiz_id', onDelete: 'CASCADE', as: 'questions' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'quiz' });



Quiz.hasMany(QuizResult, { foreignKey: 'quiz_id', onDelete: 'CASCADE', as: 'quizResults' });
QuizResult.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'quiz' });

// User associations
User.hasMany(Enrollment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Payment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(QuizResult, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'quizResults' });
QuizResult.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Note, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Note.belongsTo(User, { foreignKey: 'user_id' });


User.hasOne(CourseProgress, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CourseProgress.belongsTo(User, { foreignKey: 'user_id' });


User.hasMany(LessonProgress, { foreignKey: 'user_id', onDelete: 'CASCADE' });
LessonProgress.belongsTo(User, { foreignKey: 'user_id' });


User.hasMany(LessonQuestion, { foreignKey: 'user_id', onDelete: 'CASCADE' });
LessonQuestion.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(LessonAnswer, { foreignKey: 'user_id', onDelete: 'CASCADE' });
LessonAnswer.belongsTo(User, { foreignKey: 'user_id' });

// Enrollment associations
Course.hasMany(Enrollment, { foreignKey: 'course_id', onDelete: 'CASCADE', as: 'enrollments' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

Payment.hasMany(Enrollment, { foreignKey: 'payment_id', onDelete: 'CASCADE', as: 'enrollments' });
Enrollment.belongsTo(Payment, { foreignKey: 'payment_id', as: 'payment' });



Enrollment.hasOne(CourseProgress, { foreignKey: 'enrollment_id', onDelete: 'CASCADE', as: 'courseProgress' });
CourseProgress.belongsTo(Enrollment, { foreignKey: 'enrollment_id', as: 'enrollment' });


Enrollment.hasMany(LessonProgress, { foreignKey: 'enrollment_id', onDelete: 'CASCADE', as: 'lessonProgress' });
LessonProgress.belongsTo(Enrollment, { foreignKey: 'enrollment_id', as: 'enrollment' });




// Sync the database
await sequelize.sync({ force: false, alter: true, hooks: true });

const model = {
    User,
    Level,
    Category,
    Section,
    Lesson,
    Video,
    Quiz,
    Question,
    Document,
    Enrollment,
    Course,
    Coupon,
    CourseCategory,
    Payment,
    QuizResult,
    Note,
    ChargeCode,
    LessonProgress,
    CourseProgress,
    LessonQuestion,
    LessonAnswer
};

export default model;
