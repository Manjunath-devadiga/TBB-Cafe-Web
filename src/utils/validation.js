export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  if (/\s/.test(password)) {
    return "Password cannot contain spaces";
  }

  return "";
};

export const validateName = (name) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (!/^[A-Za-z\s]+$/.test(name)) {
    return "Name should contain only letters";
  }

  return "";
};

export const validatePhone = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return "Enter a valid 10-digit phone number";
  }

  return "";
};

export const validateAddress = (address) => {
  if (!address.trim()) {
    return "Address is required";
  }

  if (address.trim().length < 10) {
    return "Address is too short";
  }

  return "";
};

export const validateRating = (rating) => {
  if (!rating) {
    return "Please select a rating";
  }

  return "";
};

export const validateMessage = (message) => {
  if (!message.trim()) {
    return "Message is required";
  }

  if (message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }

  return "";
};

export const validateDate = (date) => {
  if (!date) {
    return "Date is required";
  }

  return "";
};

export const validateTime = (time) => {
  if (!time) {
    return "Time is required";
  }

  const [hour, minute] = time.split(":").map(Number);

  if (
    hour < 10 ||
    hour > 19 ||
    (hour === 19 && minute > 0)
  ) {
    return "Booking allowed only between 10 AM and 7 PM";
  }

  return "";
};

export const validateFutureReservation = (date, time) => {
  if (!date || !time) {
    return "";
  }

  const selectedDateTime = new Date(`${date} ${time}`);
  const now = new Date();

  if (selectedDateTime < now) {
    return "Reservation must be in the future";
  }

  return "";
};

export const validateGuests = (guests) => {
  if (!guests) {
    return "Guests required";
  }

  if (guests < 1) {
    return "At least 1 guest required";
  }

  if (guests > 5) {
    return "Max 5 guests allowed";
  }

  return "";
};

export const validateTableNo = (tableNo) => {
  if (!tableNo) {
    return "Please select a table";
  }

  return "";
};