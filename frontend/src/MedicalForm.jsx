import React, { useState } from "react";
import axios from "axios";

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    pulseRate: "",
    bloodPressure: "",
    glucose: "",
    allergies: {
      antibiotics: false,
      aspirin: false,
      localAnesthetics: false,
      metals: false,
      penicillin: false,
      plastic: false,
      sedative: false,
      sleepingPills: false,
      others: "",
    },
    surgeries: {
      appendix: false,
      heart: false,
      bladder: false,
      liver: false,
      others: "",
    },
    medicalConditions: {
      diabetes: false,
      heart: false,
      bloodPressure: false,
      stroke: false,
      others: "",
    },
    habits: {
      smoke: false,
      drink: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const [category, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Medical History Form</h2>
      <div>
        <label>Height:</label>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Weight:</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Pulse Rate:</label>
        <input
          type="text"
          name="pulseRate"
          value={formData.pulseRate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Blood Pressure:</label>
        <input
          type="text"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Glucose:</label>
        <input
          type="text"
          name="glucose"
          value={formData.glucose}
          onChange={handleChange}
        />
      </div>
      <h3>Allergies</h3>
      {Object.keys(formData.allergies).map((key) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              name={`allergies.${key}`}
              checked={formData.allergies[key]}
              onChange={handleChange}
            />
            {key}
          </label>
        </div>
      ))}
      <h3>Surgeries</h3>
      {Object.keys(formData.surgeries).map((key) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              name={`surgeries.${key}`}
              checked={formData.surgeries[key]}
              onChange={handleChange}
            />
            {key}
          </label>
        </div>
      ))}
      <h3>Medical Conditions</h3>
      {Object.keys(formData.medicalConditions).map((key) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              name={`medicalConditions.${key}`}
              checked={formData.medicalConditions[key]}
              onChange={handleChange}
            />
            {key}
          </label>
        </div>
      ))}
      <h3>Habits</h3>
      {Object.keys(formData.habits).map((key) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              name={`habits.${key}`}
              checked={formData.habits[key]}
              onChange={handleChange}
            />
            {key}
          </label>
        </div>
      ))}
      <button type="submit">Save</button>
      <button type="button">Cancel</button>
    </form>
  );
};

export default MedicalForm;
