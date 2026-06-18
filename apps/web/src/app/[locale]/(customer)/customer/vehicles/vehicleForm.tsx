"use client"
import  {AppShell}  from '@/components/common/app-shell' ;
import React, { useState } from "react"


interface Vehicle {
    customerId: string;
    registrationNumber: string;
    make: string;
    model: string;
    vin?: string;
    variant?: string;
    year?: string;
    engineType?: string;
    fuelType?: string;
    transmission?: string;
    odometer?: string;
    color?: string;
}

const VehicleForm: React.FC = () => {
    const [vehicle , setVehicle] = useState<Vehicle>({
        customerId: "",
        registrationNumber: "",
        make: "",
        model:"",
        vin: "",
        variant: "",
        year: "",
        engineType: "",
        fuelType: "",
        transmission: "",
        odometer: "",
        color: ""
    })
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vehicle submitted:", vehicle);
    // TODO: integrate with backend API
  };

  return (
  <AppShell>
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-blue-400">Add Vehicle</h2>

      {/* Required fields */}
      <input
        type="text"
        name="customerId"
        value={vehicle.customerId}
        onChange={handleChange}
        placeholder="Customer ID"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      
      />
      <input
        type="text"
        name="registrationNumber"
        value={vehicle.registrationNumber}
        onChange={handleChange}
        placeholder="Registration Number"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      
      />
      <input
        type="text"
        name="make"
        value={vehicle.make}
        onChange={handleChange}
        placeholder="Make"
        className= "w-full p-2 rounded bg-gray-800 border border-gray-700"
        required 
      />
      <input
        type="text"
        name="model"
        value={vehicle.model}
        onChange={handleChange}
        placeholder="Model"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Optional fields */}
      <input
        type="text"
        name="vin"
        value={vehicle.vin}
        onChange={handleChange}
        placeholder="VIN"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="variant"
        value={vehicle.variant}
        onChange={handleChange}
        placeholder="Variant"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="year"
        value={vehicle.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="engineType"
        value={vehicle.engineType}
        onChange={handleChange}
        placeholder="Engine Type"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="fuelType"
        value={vehicle.fuelType}
        onChange={handleChange}
        placeholder="Fuel Type"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="transmission"
        value={vehicle.transmission}
        onChange={handleChange}
        placeholder="Transmission"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="odometer"
        value={vehicle.odometer}
        onChange={handleChange}
        placeholder="Odometer"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="color"
        value={vehicle.color}
        onChange={handleChange}
        placeholder="Color"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Save Vehicle
      </button>
    </form>
  </AppShell>
  );
};

export default VehicleForm;