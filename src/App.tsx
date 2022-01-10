import React, { useState } from "react";
import { uploadFile } from "./utils/api";

interface AttachedFile {
  id: string;
  name: string;
  uploadProgress: number;
}

const initialFormState: {
  name: string;
  email: string;
  files: AttachedFile[];
} = {
  name: "",
  email: "",
  files: [],
};

function App() {
  const [formState, setFormState] = useState(() => initialFormState);
  const testRef = React.useRef<{
    name: string;
    email: string;
    files: AttachedFile[];
  }>(formState);
  testRef.current = formState;

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileObj = e.target.files[0];
      const id = String(+new Date()) + Math.random();
      const findIndexById = (id: string) =>
        testRef.current.files.findIndex((file) => file.id === id);

      testRef.current = {
        ...testRef.current,
        files: [
          ...testRef.current.files,
          { id, name: fileObj.name, uploadProgress: 0 },
        ],
      };
      setFormState(testRef.current);

      uploadFile(e.target.files[0], (progress: number) => {
        const idx = findIndexById(id);
        const prev = testRef.current.files.slice(0, idx);
        const next = testRef.current.files.slice(idx + 1);

        testRef.current = {
          ...testRef.current,
          files: [
            ...prev,
            { ...testRef.current.files[idx], uploadProgress: progress },
            ...next,
          ],
        };
        setFormState(testRef.current);
      });
    }
    e.target.value = "";
  };

  return (
    <div>
      <h2>○○○ 기업 지원</h2>
      <article
        style={{
          display: "flex",
          gap: 16,
          backgroundColor: "aliceblue",
          width: 400,
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <h3>지원서 작성</h3>
          <input
            type="text"
            placeholder="이름"
            style={{ width: 300 }}
            value={formState.name}
            onChange={handleChangeName}
          />
          <input
            type="email"
            placeholder="이메일"
            style={{ width: 300 }}
            value={formState.email}
            onChange={handleChangeEmail}
          />
          <strong>이력서</strong>
          <input
            type="file"
            style={{ width: 300 }}
            onChange={handleChangeFile}
          />
          <ul>
            {formState.files.map((file) => (
              <li
                key={file.id}
                style={{
                  color: file.uploadProgress < 100 ? "gray" : undefined,
                }}
              >
                <em>
                  {file.name} ({file.uploadProgress})
                </em>
              </li>
            ))}
          </ul>
        </form>
      </article>
    </div>
  );
}

export default App;
