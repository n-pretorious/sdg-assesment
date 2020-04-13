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
  let infectionsByRequestedTimeServerImpact;
  let requestedTime;
  let availHosptBedsImpact;
  let availHospitBedsSeverImpact;
  let severCasesByRequestedTimeImpact;
  let severCasesByRequestedTimeSeverImpact;
  let ICUByRequestedTimeImpact;
  let ICUByRequestedTimeSeverImpact;
  let ventilatorByRequestedTimeImpact;
  let ventilatorByRequestedTimeSeverImpact;
  let dollarsImpact;
  let dollarsSeverImpact;

  if (periodType === 'days') {
    // challenge 1
    requestedTime = 2 ** Math.trunc(timeToElapse / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeImpact;

    ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeImpact;

    dollarsImpact = infectionsByRequestedTimeImpact * (65 / 100) * 1.5 * requestedTime;
    dollarsSeverImpact = infectionsByRequestedTimeServerImpact * (65 / 100) * 1.5 * requestedTime;
  } else if (periodType === 'weeks') {
    // challenge 1
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeImpact;

    ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeImpact;

    dollarsImpact = infectionsByRequestedTimeImpact * (65 / 100) * 1.5 * requestedTime;
    dollarsSeverImpact = infectionsByRequestedTimeServerImpact * (65 / 100) * 1.5 * requestedTime;
  } else {
    // challenge 1
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenged 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;

    // challenge 3
    ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeImpact;

    ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeImpact;

    dollarsImpact = infectionsByRequestedTimeImpact * (65 / 100) * 1.5 * requestedTime;
    dollarsSeverImpact = infectionsByRequestedTimeServerImpact * (65 / 100) * 1.5 * requestedTime;
  }

  return {
    data,
    impact: {
      casesForICUByRequestedTime: Math.trunc(ICUByRequestedTimeImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeImpact),
      dollarsInFlight: Math.trunc(dollarsImpact),
      hospitalBedsByRequestedTime: Math.trunc(availHosptBedsImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeImpact),
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      casesForICUByRequestedTime: Math.trunc(ICUByRequestedTimeSeverImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeSeverImpact),
      dollarsInFlight: Math.trunc(dollarsSeverImpact),
      hospitalBedsByRequestedTime: Math.trunc(availHospitBedsSeverImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeSeverImpact),
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeServerImpact
    }
  };
};

export default covid19ImpactEstimator;
