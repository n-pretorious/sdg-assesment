const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;

  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  const availHospitalBeds = 0.35 * totalHospitalBeds;

  // variables for challenge 1
  let requestedTime;

  if (periodType === 'days') {
    requestedTime = 2 ** Math.trunc(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);
  } else {
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);
  }

  // challenge 1
  const infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
  const infectionsByRequestedTimeSeverImpact = severeImpact * requestedTime;

  // challenged 2
  const severCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;
  const severCasesByRequestedTimeSeverImpact = 0.15 * infectionsByRequestedTimeSeverImpact;

  const availBedsImpact = availHospitalBeds - severCasesByRequestedTimeImpact;
  const availBedsSeverImpact = availHospitalBeds - severCasesByRequestedTimeSeverImpact;

  // challenge 3
  const icuByRequestedTimeImpact = 0.05 * infectionsByRequestedTimeImpact;
  const icuByRequestedTimeSeverImpact = 0.05 * infectionsByRequestedTimeSeverImpact;

  const ventilatorByRequestedTimeImpact = 0.02 * infectionsByRequestedTimeImpact;
  const ventilatorByRequestedTimeSeverImpact = 0.02 * infectionsByRequestedTimeSeverImpact;

  const dolImpact = (infectionsByRequestedTimeImpact * 0.65 * 1.5) / timeToElapse;
  const dolSeverImpact = (infectionsByRequestedTimeSeverImpact * 0.65 * 1.5) / timeToElapse;

  return {
    data,
    impact: {
      // challenge 1
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact,
      // challenge 2
      hospitalBedsByRequestedTime: Math.trunc(availBedsImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeImpact),
      // challenge 3
      casesForICUByRequestedTime: Math.trunc(icuByRequestedTimeImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeImpact),
      dollarsInFlight: Math.trunc(dolImpact)
    },
    severeImpact: {
      // challenge 1
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSeverImpact,
      // challenge 2
      hospitalBedsByRequestedTime: Math.trunc(availBedsSeverImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeSeverImpact),
      // challenge 3
      casesForICUByRequestedTime: Math.trunc(icuByRequestedTimeSeverImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeSeverImpact),
      dollarsInFlight: Math.trunc(dolSeverImpact)
    }
  };
};

export default covid19ImpactEstimator;
