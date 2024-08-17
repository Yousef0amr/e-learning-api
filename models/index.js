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

Lesson.hasMany(Quiz, { foreignKey: 'lesson_id', onDelete: 'CASCADE' });
Quiz.belongsTo(Lesson, { foreignKey: 'lesson_id' });

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
Quiz.hasMany(Question, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

// User associations
User.hasMany(Enrollment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Payment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'user_id' });


// Enrollment associations
Course.hasMany(Enrollment, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

Payment.hasMany(Enrollment, { foreignKey: 'payment_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(Payment, { foreignKey: 'payment_id' });

// Sync the database
await sequelize.sync({ force: false, alter: true });

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
    Payment
};

export default model;
