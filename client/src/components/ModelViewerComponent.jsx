import React, { useEffect } from 'react';
import '@google/model-viewer';
import { useParams } from 'react-router-dom';

const ModelViewerComponent = ({modelUrl}) => {

  const model = useParams()
  useEffect(() => {
    // Aquí podrías realizar configuraciones adicionales si es necesario
  }, []);

  return (
    <div>
      <model-viewer
        src={modelUrl}
        alt="A 3D model"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: '500px' }}
      >
      </model-viewer>
    </div>
  );
};

export default ModelViewerComponent;