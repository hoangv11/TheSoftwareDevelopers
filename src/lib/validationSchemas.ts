import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string()
    .oneOf(['excellent', 'good', 'fair', 'poor'])
    .required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string()
    .oneOf(['excellent', 'good', 'fair', 'poor'])
    .required(),
  owner: Yup.string().required(),
});

export const EditProfileSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  major: Yup.string().required(),
  bio: Yup.string().required(),
  profilePictureUrl: Yup.string().required(),
});

export const CreateSessionSchema = Yup.object({
  profilePictureUrl: Yup.string().required(),
  title: Yup.string().required(),
  course: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  sessionDate: Yup.date().required(),
  startTime: Yup.date().required(),
  endTime: Yup.date().required().min(Yup.ref('startTime')),
});
