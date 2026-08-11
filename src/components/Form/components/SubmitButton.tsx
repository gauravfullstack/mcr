interface SubmitButtonProps {
  isSubmitting: boolean;
}

function SubmitButton({
  isSubmitting,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting
        ? 'Submitting...'
        : 'Submit'}
    </button>
  );
}

export default SubmitButton;