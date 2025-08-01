// utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "react-router";
/**
 * Combines class names using clsx and merges Tailwind classes smartly
 * @param  {...any} inputs - class names, conditionals, arrays, etc.
 * @returns {string} - merged class name string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description Utility function for the app
 */
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday
}from 'date-fns';

export function toTitleCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts a Date input to string format
 * @param {string | number | Date} date - date input in any valid format
 * @returns {string} - formatted date string
 */
export function formatCustomDate(date) {
  const today =  new Date();
  const relativeDay=formatRelative(date,today).split(' at ')[0];
const relativeDays= [ 'Today' , 'Tomorrow' , 'Yesterday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Thursday','Friday'];
if(relativeDays.includes(relativeDay)){
  return relativeDay;
}
 if(isSameYear(date, today)){
  return format(date, 'dd MMM');
 }else{
  return format(date, 'dd MMM yyyy');
 }
}

export function getTaskDueDateColorClass(dueDate, completed) {
  if (!dueDate || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500'; 
  }
if(isToday(dueDate)){
  return 'text-emerald-500';
}
if(isTomorrow(dueDate) && !completed){
  return 'text-amber-500';
}
}
/**
 * @returns {string} A unique identifier string compatible with Appwrite
 * Only contains a-z, A-Z, 0-9, and underscore. Max 36 characters.
 */
export function generateID() {
  // Generate a random string with only valid characters
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomPart = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  
  // Use timestamp in base36 (only contains 0-9, a-z)
  const timestamp = Date.now().toString(36);
  
  // Combine and ensure it's under 36 characters
  const id = randomPart + timestamp;
  return id.length > 36 ? id.slice(0, 36) : id;
}
export function getUserId() {
  const clerkUserId = localStorage.getItem('clerkUserId');

  if (!clerkUserId) {
    // Agar redirect() function client-side nahi hai, toh ye use karo:
    window.location.href = '/auth-sync';
    return '';
  }

  return clerkUserId;
}

export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength - 1)}...`;
  }
  return str; 
}

