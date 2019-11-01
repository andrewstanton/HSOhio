import React from "react";
import { Alert } from "../Alert";

const returnError = error => {
  // Axios Error
  console.log({ error });
  if (error !== null && error.isAxiosError) {
    if (error.response) {
      if (error.response.data === null) {
        return error.response.statusText;
      }
      if (error.response.data.errors) {
        return error.response.data.errors.message;
      }
      if (error.response.data.message) {
        return error.response.data.message;
      }
    }
  }

  return "Oh No Something Went Wrong. Try Again";
};

export const ErrorAlert = ({ error, ...props }) => (
  <Alert modifiers="danger" {...props}>
    {returnError(error)}
  </Alert>
);
