import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const NewsletterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const NewsletterForm = ({ onSuccess }) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={NewsletterSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await new Promise((res) => setTimeout(res, 1200)); // mock API

          localStorage.setItem("hasSubscribed", "true");

          toast.success("Thank you for subscribing!", {
            position: "top-right",
            autoClose: 2500,
          });

          resetForm();
          setSubmitting(false);

          onSuccess(); // close modal + update footer button
        } catch (error) {
          toast.error("Failed to subscribe. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });

          console.error(error);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h3 style={{ marginBottom: "8px" }}>Join our Newsletter</h3>
          <p style={{ marginBottom: "16px", fontSize: "14px" }}>
            Get updates on events, news and activities.
          </p>

          <Field
            type="email"
            name="email"
            placeholder="Your email address"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          />

          <ErrorMessage
            name="email"
            component="div"
            style={{ color: "red", marginBottom: "10px", fontSize: "13px" }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "12px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewsletterForm;
