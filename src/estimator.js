const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;
  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  const availableHospitalForSever = 0.35 * totalHospitalBeds;

  // variables for challenge 1
  let requestedTime;
  let infectionsByRequestedTimeImpact;
  let infectionsByRequestedTimeSeverImpact;

  // variables for challenge 2
  let availHosptBedsImpact;
  let availHospitBedsSeverImpact;
  let severCasesByRequestedTimeImpact;
  let severCasesByRequestedTimeSeverImpact;

  // variables for challenge 3
  let ICUByRequestedTimeImpact;
  let ICUByRequestedTimeSeverImpact;
  let ventilatorByRequestedTimeImpact;
  let ventilatorByRequestedTimeSeverImpact;
  let d$Impact;
  let d$SeverImpact;

  if (periodType === 'days') {
    // challenge 1
    requestedTime = 2 ** Math.trunc(timeToElapse / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeSeverImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = 0.15 * infectionsByRequestedTimeSeverImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    ICUByRequestedTimeImpact = 0.05 * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = 0.05 * infectionsByRequestedTimeSeverImpact;

    ventilatorByRequestedTimeImpact = 0.02 * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = 0.02 * infectionsByRequestedTimeSeverImpact;

    d$Impact = (infectionsByRequestedTimeImpact * 0.65) * 1.5 * timeToElapse;
    d$SeverImpact = (infectionsByRequestedTimeSeverImpact * 0.65) * 1.5 * timeToElapse;
  } else if (periodType === 'weeks') {
    // challenge 1
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeSeverImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = 0.15 * infectionsByRequestedTimeSeverImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
  } else {
    // challenge 1
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeSeverImpact = severeImpact * requestedTime;

    // challenged 2
    severCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = 0.15 * infectionsByRequestedTimeSeverImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
  }

  return {
    data,
    impact: {
      casesForICUByRequestedTime: Math.trunc(ICUByRequestedTimeImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeImpact),
      dollarsInFlight: Math.trunc(d$Impact),
      hospitalBedsByRequestedTime: Math.trunc(availHosptBedsImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeImpact),
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      casesForICUByRequestedTime: Math.trunc(ICUByRequestedTimeSeverImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeSeverImpact),
      dollarsInFlight: Math.trunc(d$SeverImpact),
      hospitalBedsByRequestedTime: Math.trunc(availHospitBedsSeverImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeSeverImpact),
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSeverImpact
    }
  };
};

export default covid19ImpactEstimator;
