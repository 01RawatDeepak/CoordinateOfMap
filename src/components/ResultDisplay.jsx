import React from "react";

function ResultDisplay({ modalContent, closeModal }) { 
    if (modalContent.length === 0) {
        return null;
      } 
  return (
    <div className="modal fade show d-block"  tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          

          <div className="modal-body">
            <div className="text-end">
          <button type="button"className="btn-close"  onClick={closeModal}></button>
          </div>
            {modalContent.map((coords, index) => {
             console.log(coords);
              if (
                Array.isArray(coords) &&
                Array.isArray(coords[0]) &&
                Array.isArray(coords[0][0])
              ) {
               
                const flattenedCoords = coords[0]; 
                return (
                  <div key={index} className="mb-2">
                    <div className="fw-bold fs-2 mb-3">Shape of cordinate ({index + 1}):</div>
                    {flattenedCoords.map((point, pointIndex) => (
                      <div key={pointIndex}>
                       
                        <div className="d-flex align-items-end "> <p className="fw-bold fs-5 mb-0 me-3">Point of line: {pointIndex}</p> <span className="me-3"><span className="fw-bold ">Longitude:</span> {point[0]},</span><span className="fw-bold">Latitude:</span> {point[1]}</div>
                      </div>
                    ))}
                  </div>
                );
              } else if (Array.isArray(coords) && coords.length === 2) {
             
                return (
                  <div key={index} className="mb-2">
                        <div className=""> <p className="fw-bold fs-5 mb-0 me-3">Line: ({index + 1})</p><span className="me-3"><span className="fw-bold "> Longitude: </span>{coords[0]},</span><span className="fw-bold ">Latitude:</span> {coords[1]}</div>
                  
                  </div>
                );
              } else {
                return (
                    <div key={index} className="mb-2">
                    <strong>WP({index + 1}):</strong>
                    <ul className="ul_custom">
                      {coords.map((coord, i) => (                       
                        <li><span className="me-3"><span className="fw-bold "> Longitude: </span>{coord[0]},</span><span className="fw-bold ">Latitude:</span> {coord[1]}</li>

                      ))}
                    </ul>
                  </div>
                  
                );
              }
            })}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;
