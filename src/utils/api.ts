export const uploadFile = async (
  file: File,
  progressFn: (progress: number) => void
) => {
  let progress = -1;
  return new Promise((resolve) => {
    const id = window.setInterval(() => {
      progressFn(++progress);
      if (progress >= 100) {
        window.clearInterval(id);
        resolve({
          name: file.name,
        });
      }
    }, 100);
  });
};
