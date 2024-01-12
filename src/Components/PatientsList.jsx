import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./PatientsList.module.css";
import { formatDate, sortByDateOrName } from "../utils/helpers";

const PatientsList = () => {
  const navigate = useNavigate();
  const {
    data: { patients: patientsList },
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const levels = [
    ...new Set(patientsList.map((patient) => patient.type.slice(0, 1))),
  ].sort((a, b) => a - b);

  return (
    <div className={styles.content}>
      {isAuthenticated ? (
        <>
          <h1 className={styles.heading}>Patients:</h1>
          <div className={styles.levelContainer}>
            {levels.map((type) => {
              const filteredAndSortedPatients = patientsList
                .filter(
                  (patient) =>
                    patient.is_completed === false &&
                    patient.type.slice(0, 1) === type
                )
                .sort(sortByDateOrName);

              return (
                <div key={Math.random()}>
                  <h2
                    className={styles.level}
                  >{`${type.toUpperCase()}-LEVEL`}</h2>
                  <div className={styles.cardContainer}>
                    {filteredAndSortedPatients.map((patient) => {
                      return (
                        <div className={styles.card} key={Math.random()}>
                          <p>{`Name: ${patient.name}`}</p>
                          <p>{`Joined: ${formatDate(patient.joined)}`}</p>
                          <p>{`Last visit: ${formatDate(
                            patient.last_visit_date
                          )}`}</p>
                          <p>{`Completed: ${
                            patient.is_completed === false ? "no" : "yes"
                          }`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Sorry, you have to be authenticated to view patient information
          </h1>
          <button
            className={styles.buttonNavigate}
            onClick={() => navigate("/")}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientsList;
