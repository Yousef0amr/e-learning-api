
import model from '../models/index.js';
import wrap from 'express-async-wrap'


const { LessonProgress, CourseProgress, Lesson, Section } = model;

const watchLessonVideo = wrap(async (req, res) => {
  const { enrollmentId, courseId, lessonId } = req.body;
  const userId = req.user_id;

  // Find lesson progress for user, course, and lesson
  let progress = await LessonProgress.findOne({
    where: { user_id: userId, enrollment_id: enrollmentId, lesson_id: lessonId },
  });

  if (!progress) {
    // Create progress if it doesn't exist and mark lesson as completed after first watch
    progress = await LessonProgress.create({
      user_id: userId,
      enrollment_id: enrollmentId,
      lesson_id: lessonId,
      watch_count: 1,
      is_completed: true, // Mark as completed after first watch
    });

    // Update course progress immediately after lesson is completed
    await updateCourseProgress(userId, enrollmentId, courseId);

    return res.status(200).json({ watch_count: progress.watch_count, is_completed: progress.is_completed });
  }

  if (progress.watch_count >= 4) {
    return res.status(200).json({ message: "Lesson completed after fourth watch." });
  }

  // Increment the watch count
  progress.watch_count += 1;

  await progress.save();

  // Automatically update course progress after lesson is completed
  await updateCourseProgress(userId, enrollmentId, courseId);

  return res.status(200).json({ message: "Lesson completed after first watch." });

});

const updateCourseProgress = async (userId, enrollmentId, courseId) => {

  // Count total lessons in the course
  const totalLessons = await Lesson.count({
    include: [
      {
        model: Section,
        where: { course_id: courseId }, // Filter sections by course ID
      },
    ],
  });


  // Count completed lessons by the user for the course
  const completedLessons = await LessonProgress.count({
    where: { user_id: userId, enrollment_id: enrollmentId, is_completed: true },
  });

  // Calculate progress percentage
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const isCourseCompleted = progressPercentage === 100;

  // Upsert (update or insert) course progress
  await CourseProgress.upsert({
    user_id: userId,
    enrollment_id: enrollmentId,
    progress_percentage: progressPercentage,
    is_completed: isCourseCompleted,
  },
    {
      where: {
        user_id: userId,
        enrollment_id: enrollmentId,
      }
    }
  );
};

export {
  watchLessonVideo
}