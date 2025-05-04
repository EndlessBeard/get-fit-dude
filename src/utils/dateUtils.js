/**
 * Date utility functions for Get Fit Dude app
 */

/**
 * Format a date as DD/MM/YYYY
 * @param {Date} date - The date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Parse a date string in DD/MM/YYYY format
 * @param {string} dateStr - Date string in DD/MM/YYYY format
 * @returns {Date} Parsed date object
 */
export const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Get the day of the week (Monday, Tuesday, etc.) for a date
 * @param {Date} date - The date 
 * @returns {string} Day of the week
 */
export const getDayOfWeek = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(date).getDay()];
};

/**
 * Get the day of the week as lowercase string (monday, tuesday, etc.)
 * @param {Date} date - The date
 * @returns {string} Lowercase day of the week
 */
export const getDayOfWeekLowerCase = (date) => {
  return getDayOfWeek(date).toLowerCase();
};

/**
 * Get the short day name (Mon, Tue, etc.) for a date
 * @param {Date} date - The date
 * @returns {string} Short day name
 */
export const getShortDayName = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(date).getDay()];
};

/**
 * Get the week number for a date
 * @param {Date} date - The date
 * @param {Date} startDate - The start date for week 1
 * @returns {number} Week number
 */
export const getWeekNumber = (date, startDate) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((new Date(date) - new Date(startDate)) / millisecondsPerDay);
  return Math.floor(diffDays / 7) + 1;
};

/**
 * Get the dates for the current week (Sunday to Saturday)
 * @param {Date} currentDate - The current date
 * @returns {Date[]} Array of dates for the week
 */
export const getWeekDates = (currentDate) => {
  const date = new Date(currentDate);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  const result = [];
  
  // Get Sunday (start of week)
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - day);
  
  // Create array of dates for the week
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(sunday);
    weekDate.setDate(sunday.getDate() + i);
    result.push(weekDate);
  }
  
  return result;
};

/**
 * Check if two dates are the same day (ignoring time)
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if same day
 */
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
};

/**
 * Add days to a date
 * @param {Date} date - The date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get the start and end dates of a week
 * @param {Date} date - Any date in the week
 * @returns {Object} Object with start and end dates
 */
export const getWeekRange = (date) => {
  const day = date.getDay(); // 0 for Sunday, 6 for Saturday
  const diff = date.getDate() - day;
  
  const start = new Date(date);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};