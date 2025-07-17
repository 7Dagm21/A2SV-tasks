import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ContactFormData from "../types/contact";
import contactImg from "../assets/contact.svg";


const ContactForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-form-section">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="contact-input"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="example@example.com"
              className="contact-input"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              placeholder="Message"
              className="contact-textarea"
            />
            {errors.message && (
              <p className="error">{errors.message.message}</p>
            )}

            <button type="submit" className="contact-button">
              Send
            </button>
          </form>
        </div>

        <div className="contact-illustration-section">
          <img src={contactImg} alt="Contact" />
        </div>
      </div>

      <DevTool control={control} />
    </div>
  );
};

export default ContactForm;
