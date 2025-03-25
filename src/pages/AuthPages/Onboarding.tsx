import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
// import SignUpForm from "../../components/auth/SignUpForm";
import OnboardingForm from "../../components/auth/OnboadingForm";

export default function Onboading() {
  return (
    <>
      <PageMeta
        title="React.js onboading form| TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <OnboardingForm />
      </AuthLayout>
    </>
  );
}
