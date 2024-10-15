import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  return (
    <form action={signUp} className="p-4 flex flex-col gap-y-2">
      <input name="firstName" type="text" placeholder="First Name" />
      <input name="lastName" type="text" placeholder="Last Name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export { SignUpForm };
