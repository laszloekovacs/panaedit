import React, { useState, createContext } from "react";

export type Project = {
  projectFile: FileSystemFileHandle | null;
  projectsInDirectory: string[] | null;
  workingDirectory: FileSystemDirectoryHandle;
  assetsDirectory: FileSystemDirectoryHandle;
  panoramaDirectory: FileSystemDirectoryHandle;
  imagesDirectory: FileSystemDirectoryHandle;
};

export type ProjectContext = {
  project: Project | null;
  setProject: ((p: Project) => void) | null;
};

/** */
export const projectContext = createContext<ProjectContext>({ project: null, setProject: null });

/** */
function ProjectProvider({ children }) {
  const [project, setProject] = useState<Project | null>(null);

  const handlePopup = async (e) => {
    try {
      const wd = await window.showDirectoryPicker({
        mode: "read",
        startIn: "desktop",
      });

      /* paths dont seem to work, so store it separate */
      const ad = await wd.getDirectoryHandle("assets");
      const pd = await ad.getDirectoryHandle("panorama");
      const id = await ad.getDirectoryHandle("images");

      const project: Project = {
        projectFile: null,
        projectsInDirectory: null,
        workingDirectory: wd,
        assetsDirectory: ad,
        panoramaDirectory: pd,
        imagesDirectory: id,
      };

      setProject(project);
    } catch (err) {
      console.log(err);
    }
  };

  const selectorUI = (
    <div>
      <h2>Select local working directory</h2>
      <button onClick={handlePopup}>select</button>
    </div>
  );

  /** */
  return (
    <projectContext.Provider value={{ project: project, setProject: setProject }}>
      {project && children}
      {!project && selectorUI}
    </projectContext.Provider>
  );
}

export default ProjectProvider;
