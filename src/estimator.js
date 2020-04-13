const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;
  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  const availableHospitalForSever = (35 / 100) * totalHospitalBeds;
  let infectionsByRequestedTimeImpact;
  let infectionsByRequestedTimeSeverImpact;
  let requestedTime;
  let availHosptBedsImpact;
  let availHospitBedsSeverImpact;
  let severCasesByRequestedTimeImpact;
  let severCasesByRequestedTimeSeverImpact;
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
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeSeverImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    ICUByRequestedTimeImpact = 0.05 * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeSeverImpact;

    // ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    // ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeSeverImpact;

    // d$Impact = (infectionsByRequestedTimeImpact * 0.65) * 1.5 * 30;
    // d$SeverImpact = (infectionsByRequestedTimeSeverImpact * 0.65) * 1.5 * 30;
  } else if (periodType === 'weeks') {
    // challenge 1
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeSeverImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeSeverImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    // ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    // ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeSeverImpact;

    // ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    // ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeSeverImpact;

    // d$Impact = (infectionsByRequestedTimeImpact * 0.65) * 1.5 * timeToElapse;
    // d$SeverImpact = (infectionsByRequestedTimeSeverImpact * 0.65) * 1.5 * timeToElapse;
  } else {
    // challenge 1
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeSeverImpact = severeImpact * requestedTime;

    // challenged 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeSeverImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    // ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    // ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeSeverImpact;

    // ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    // ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeSeverImpact;

    // d$Impact = (infectionsByRequestedTimeImpact * 0.65) * 1.5 * timeToElapse;
    // d$SeverImpact = (infectionsByRequestedTimeSeverImpact * 0.65) * 1.5 * timeToElapse;
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
