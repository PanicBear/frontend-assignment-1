import { AttachedFile } from "./AttachedFile";

interface FormState {
  name: string;
  email: string;
  files: AttachedFile[];
}

export type { FormState };
