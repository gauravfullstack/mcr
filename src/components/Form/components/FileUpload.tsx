interface FileUploadProps {
  file: File | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FileUpload({
  file,
  onChange,
}: FileUploadProps) {
  return (
    <div>
      <input
        type="file"
        onChange={onChange}
      />

      {file && (
        <p>
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}

export default FileUpload;