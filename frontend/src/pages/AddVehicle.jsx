import React, { useState } from 'react';

const VEHICLE_TYPES = ['Bus', 'Mini-bus', 'Truck', 'Van', 'SUV', 'Other'];
const STATUS_OPTIONS = [
  { value: 'available', label: 'Available (Active)' },
  { value: 'maintenance', label: 'In Maintenance' },
  { value: 'out_of_service', label: 'Out of Service' }
];

export default function AddVehicle({ onAddVehicle, onCancel }) {
  const [plateNo, setPlateNo] = useState('');
  const [vehicleType, setVehicleType] = useState('Bus');
  const [fuelType, setFuelType] = useState('petrol');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [odometer, setOdometer] = useState('0');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('available');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = [];

    if (!plateNo.trim()) errs.push('Plate Number is required.');
    if (maxCapacity && isNaN(maxCapacity)) errs.push('Max Capacity must be a number.');
    if (odometer && isNaN(odometer)) errs.push('Odometer must be a number.');
    if (cost && isNaN(cost)) errs.push('Acquisition Cost must be a number.');

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    onAddVehicle({
      plate_no: plateNo,
      vehicle_type: vehicleType,
      fuel_type: fuelType,
      maxloadcapacity: maxCapacity ? parseInt(maxCapacity, 10) : null,
      odometer: odometer ? parseInt(odometer, 10) : 0,
      acquisition_cost: cost ? parseFloat(cost) : null,
      status: status
    });
  };

  return (
    <div className="container-fluid py-3 text-start">
      {/* Header */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <button onClick={onCancel} className="btn btn-sm btn-outline-secondary">
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h5 className="mb-0 fw-bold">
            <i className="fas fa-plus-circle me-2 text-primary"></i>Register New Vehicle
          </h5>
          <p className="text-muted small mb-0">Add a transport vehicle to the active database</p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="alert alert-danger alert-dismissible fade show">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <ul className="mb-0 ps-3">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
          <button type="button" className="btn-close" onClick={() => setErrors([])}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Plate Number <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-id-card text-muted"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. MH-12-AB-1234"
                      value={plateNo}
                      onChange={(e) => setPlateNo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Vehicle Type</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-bus text-muted"></i></span>
                    <select
                      className="form-select"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Fuel Type</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-gas-pump text-muted"></i></span>
                    <select
                      className="form-select"
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Max Load Capacity (kg)</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-weight-hanging text-muted"></i></span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 5000"
                      value={maxCapacity}
                      onChange={(e) => setMaxCapacity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Odometer (km)</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-tachometer-alt text-muted"></i></span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 15000"
                      value={odometer}
                      onChange={(e) => setOdometer(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Acquisition Cost (USD)</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-dollar-sign text-muted"></i></span>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      placeholder="e.g. 45000.00"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Fleet Status</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-info-circle text-muted"></i></span>
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="fas fa-save me-2"></i>Register Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
