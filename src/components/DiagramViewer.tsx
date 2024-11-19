import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface DiagramViewerProps {
  diagram: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagram }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'inter',
    });
    renderDiagram();
  }, [diagram]);

  const renderDiagram = async () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const { svg } = await mermaid.render('diagram', diagram);
      containerRef.current.innerHTML = svg;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-gray-200" />
          ) : (
            <Maximize2 className="w-5 h-5 text-gray-200" />
          )}
        </button>
      </div>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        centerOnInit
        wheel={{ wheelDisabled: false }}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => zoomIn()}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-gray-200" />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-gray-200" />
              </button>
            </div>
            <TransformComponent wrapperClass="w-full h-full">
              <div
                ref={containerRef}
                className="w-full h-full flex items-center justify-center p-8"
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};