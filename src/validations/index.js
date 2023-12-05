import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required(),
  newPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_@.-]{8,}$/,
      "Password must have 8 or more characters, at least one uppercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "The passwords you entered do not match."),
});

export const videoFormSchema = yup.object().shape({
  category: yup.object().shape({
    cateName: yup.string().required("Please Select Category"),
    cateId: yup.string(),
  }),
  title: yup.string().required(),
  difficulty: yup.string().required(),
  duration: yup.string().required(),
  equipment: yup.object().shape({
    equipmentName: yup
      .array()
      .min(1, "You can't leave this blank.")
      .required("equipment is required."),
    equipmentId: yup.array(),
  }),
  description: yup.string().required(),
  video: yup.mixed().required(),
  thumbnail: yup.mixed().required(),
});

export const adminVideoFormSchema = yup.object().shape({
  category: yup.object().shape({
    cateName: yup.string().required("Please Select Category"),
    cateId: yup.string(),
  }),
  instructor: yup.object().shape({
    name: yup.string().required("Please Select Instructor"),
    userId: yup.string(),
    userImage: yup.string(),
  }),
  title: yup.string().required(),
  difficulty: yup.string().required(),
  duration: yup.string().required(),
  equipment: yup.object().shape({
    equipmentName: yup
      .array()
      .min(1, "You can't leave this blank.")
      .required("equipment is required."),
    equipmentId: yup.array(),
  }),
  description: yup.string().required(),
  video: yup.mixed().required(),
  thumbnail: yup.mixed().required(),
});

export const EventFormSchema = yup.object().shape({
  thumbnail: yup.mixed().required(),
  title: yup.string().required(),
  duration: yup.string().required(),
  category: yup.object().shape({
    cateName: yup.string().required("Please Select Category"),
    cateId: yup.string(),
  }),
  description: yup.string().required(),
  date: yup.date().required(),
  time: yup.mixed().required(),
  difficulty: yup.string().required(),
  equipment: yup.object().shape({
    equipmentName: yup
      .array()
      .min(1, "You can't leave this blank.")
      .required("equipment is required."),
    equipmentId: yup.array(),
  }),
});

export const InstructorFormSchema = yup.object().shape({
  profileImage: yup.mixed().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  languages: yup
    .array()
    .min(1, "You can't leave this blank.")
    .required("languages is required."),
  specialization: yup
    .array()
    .min(1, "You can't leave this blank.")
    .required("specialization is required.")
    .nullable(),
  bio: yup.string().required(),
});

export const userFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  username: yup.string().required(),
  profilePic: yup.mixed().required(),
  bio: yup.string().required(),
});

export const adminFormSchema = yup.object().shape({
  role: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
  phoneNumber: yup.string().required().min(8).max(11),
  profileImage: yup.mixed().required(),
});

export const updateAdminFormSchema = yup.object().shape({
  role: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  profileImage: yup.mixed(),
});

export const adminEventFormSchema = yup.object().shape({
  thumbnail: yup.mixed().required(),
  title: yup.string().required(),
  duration: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  time: yup.mixed().required(),
});

export const adminStudentFormSchema = yup.object().shape({
  class: yup.string().required(),
  profileImage: yup.mixed().required(),
  fullName: yup.string().required(),
  fatherName: yup.string().required(),
  email: yup.string().email().required(),
  contactNo: yup.string().required().min(8).max(11),
  city: yup.string().required(),
  country: yup.string().required(),
  status: yup.string().required(),
});

export const updateAdminStudentFormSchema = yup.object().shape({
  class: yup.string(),
  profileImage: yup.mixed(),
  fullName: yup.string(),
  fatherName: yup.string(),
  email: yup.string().email(),
  contactNo: yup.string().min(8).max(11),
  city: yup.string(),
  country: yup.string(),
  status: yup.string(),
});

export const adminTeacherFormSchema = yup.object().shape({
  fullName: yup.string().required(),
  profileImage: yup.mixed().required(),
  contact: yup.string().min(8).max(11),
  email: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  status: yup.string().required(),
  education: yup.string().required(),
  speciality: yup.string().required(),
  about: yup.string().required(),
  classAssign: yup.string().required(),
});
export const updateAdminTeacherFormSchema = yup.object().shape({
  fullName: yup.string(),
  profileImage: yup.mixed(),
  contact: yup.string().min(8).max(11),
  city: yup.string(),
  education: yup.string(),
  speciality: yup.string(),
  about: yup.string(),
  classAssign: yup.string(),
});
