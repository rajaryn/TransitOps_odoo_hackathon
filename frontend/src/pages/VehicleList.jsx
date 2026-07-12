import React, { useState } from 'react';

export default function VehicleList({
  vehicles,
  onDeleteVehicle,
  onAddVehicleClick,
  onEditVehicleClick,
  onAddDocument,
  onDeleteDocument
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [docModalVehicle, setDocModalVehicle] = useState(null);
  const [docName, setDocName] = useState('');
  const [docPath, setDocPath] = useState('');

  // Filtered vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const q = searchQuery.toLowerCase();
    return (
      v.plate_no.toLowerCase().includes(q) ||
      (v.vehicle_type && v.vehicle_type.toLowerCase().includes(q)) ||
      (v.status && v.status.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'available':
        return 'bg-success';
      case 'maintenance':
        return 'bg-warning text-dark';
      case 'out_of_service':
      case 'out of service':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const handleOpenDocModal = (vehicle) => {
    setDocModalVehicle(vehicle);
    setDocName('');
    setDocPath('');
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (!docName.trim() || !docPath.trim()) return;
    onAddDocument(docModalVehicle.VehicleID, docName, docPath);
    setDocModalVehicle(null);
  };

  return (
    <div className="container-fluid py-3 text-start">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <h5 className="mb-0 fw-bold">
            <i className="fas fa-bus me-2 text-primary"></i>Vehicle Fleet Directory
          </h5>
          <p className="text-muted small mb-0 mt-1">Manage corporate fleet vehicles, capacity records, and compliance papers</p>
        </div>
        <button className="btn btn-primary" onClick={onAddVehicleClick}>
          <i className="fas fa-plus me-2"></i>Add Vehicle
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="stat-card stat-blue text-center py-3">
            <h4 className="mb-0">{vehicles.length}</h4>
            <p className="mb-0 small">Total Fleet Size</p>
            <i className="fas fa-truck-monster stat-icon"></i>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card stat-green text-center py-3">
            <h4 className="mb-0">
              {vehicles.filter(v => (v.status || '').toLowerCase() === 'available').length}
            </h4>
            <p className="mb-0 small">Active / Available</p>
            <i className="fas fa-check-circle stat-icon"></i>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card stat-orange text-center py-3">
            <h4 className="mb-0">
              {vehicles.filter(v => (v.status || '').toLowerCase() === 'maintenance').length}
            </h4>
            <p className="mb-0 small">In Maintenance</p>
            <i className="fas fa-tools stat-icon"></i>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card stat-purple text-center py-3">
            <h4 className="mb-0">
              {vehicles.reduce((acc, v) => acc + (v.documents ? v.documents.length : 0), 0)}
            </h4>
            <p className="mb-0 small">Linked Documents</p>
            <i className="fas fa-file-invoice stat-icon"></i>
          </div>
        </div>
      </div>

      {/* Fleet Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-2 py-3">
          <span className="fw-semibold"><i className="fas fa-list me-2"></i>Fleet Inventory ({filteredVehicles.length})</span>
          <input
            type="text"
            className="form-control form-control-sm"
            style={{ maxWidth: '260px' }}
            placeholder="🔍 Search plate, type, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '15%' }}>Plate Number</th>
                  <th style={{ width: '15%' }}>Vehicle Type</th>
                  <th style={{ width: '12%' }}>Capacity</th>
                  <th style={{ width: '10%' }}>Odometer</th>
                  <th style={{ width: '13%' }}>Acquisition Cost</th>
                  <th style={{ width: '10%' }}>Status</th>
                  <th style={{ width: '20%' }}>Attached Papers</th>
                  <th style={{ width: '10%' }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-5">
                      <i className="fas fa-bus fa-2x mb-2 d-block opacity-25"></i>
                      No vehicles found in the fleet directory.
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((v, idx) => (
                    <tr key={v.VehicleID}>
                      <td className="text-muted">{idx + 1}</td>
                      <td>
                        <strong className="text-dark d-block">
                          <i className="fas fa-truck me-2 text-muted small"></i>{v.plate_no}
                        </strong>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-secondary fw-semibold">
                            {v.vehicle_type || 'Unknown'}
                          </span>
                          <span className="badge bg-light text-muted border align-self-start mt-1 small" style={{ fontSize: '.65rem' }}>
                            <i className="fas fa-gas-pump me-1"></i>{v.fuel_type || 'petrol'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {v.maxloadcapacity ? `${v.maxloadcapacity} kg` : 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="small text-muted">{v.odometer ? `${v.odometer.toLocaleString()} km` : '0 km'}</span>
                      </td>
                      <td>
                        <span className="small fw-semibold text-secondary">
                          {v.acquisition_cost ? `$${v.acquisition_cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(v.status)}`}>
                          {v.status || 'available'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          {v.documents && v.documents.map((doc) => (
                            <div key={doc.ID} className="d-flex justify-content-between align-items-center gap-2 border-bottom-dashed pb-1 small">
                              <span className="text-muted text-truncate" style={{ maxWidth: '130px' }} title={doc.DocumentName}>
                                <i className="fas fa-file-alt text-primary me-1"></i>{doc.DocumentName}
                              </span>
                              <div className="d-flex gap-1">
                                <a
                                  href={doc.filepath}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-secondary hover-primary"
                                  title="View File"
                                >
                                  <i className="fas fa-external-link-alt" style={{ fontSize: '.75rem' }}></i>
                                </a>
                                <button
                                  type="button"
                                  className="btn p-0 text-danger"
                                  style={{ fontSize: '.75rem' }}
                                  onClick={() => {
                                    if (window.confirm(`Delete document "${doc.DocumentName}"?`)) {
                                      onDeleteDocument(doc.ID);
                                    }
                                  }}
                                  title="Delete Document"
                                >
                                  <i className="fas fa-times-circle"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-secondary mt-1 align-self-start"
                            onClick={() => handleOpenDocModal(v)}
                            style={{ fontSize: '.65rem', padding: '1px 5px' }}
                          >
                            <i className="fas fa-plus-circle me-1"></i>Link Paper
                          </button>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex gap-1 justify-content-end align-items-center">
                          <button
                            className="btn btn-xs btn-outline-primary"
                            onClick={() => onEditVehicleClick(v)}
                            title="Edit Vehicle"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-xs btn-outline-danger"
                            onClick={() => onDeleteVehicle(v.VehicleID)}
                            title="Remove Vehicle"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inline Document Addition Dialog */}
      {docModalVehicle && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-0 pb-0">
                <h6 className="modal-title fw-bold">
                  <i className="fas fa-file-prescription text-primary me-2"></i>Link Paper to {docModalVehicle.plate_no}
                </h6>
                <button type="button" className="btn-close" onClick={() => setDocModalVehicle(null)}></button>
              </div>
              <form onSubmit={handleDocSubmit}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Paper / Document Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Insurance policy, Fitness certificate"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">File URL / Server Path</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. /uploads/docs/fitness_108.pdf"
                      value={docPath}
                      onChange={(e) => setDocPath(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0 justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setDocModalVehicle(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Attach Paper
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
