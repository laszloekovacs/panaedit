import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { SceneType } from '../reducer/storeDefaults';

function WorkingDirectorySelector({ children }) {
  const workingDirectory = useSelector((state: SceneType) => state.editor?.workingDirectory);

  const handlePopup = (e) => {
    console.log('select directory');
  };

  const selectorUI = (
    <div className="working-dir">
      <h2>Select local working directory</h2>
      <button onClick={handlePopup}>select</button>
    </div>
  );

  return (
    <>
      {workingDirectory && children}
      {!workingDirectory && selectorUI}
    </>
  );
}

export default WorkingDirectorySelector;
