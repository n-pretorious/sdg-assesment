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
  let _$Impact;
  let _$SeverImpact;

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
    ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeSeverImpact;

    ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeSeverImpact;

    _$Impact = infectionsByRequestedTimeImpact * (65 / 100) * 1.5 * timeToElapse;
    _$SeverImpact = infectionsByRequestedTimeSeverImpact * (65 / 100) * 1.5 * timeToElapse;
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
    ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeSeverImpact;

    ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeSeverImpact;

    _$Impact = infectionsByRequestedTimeImpact * (65 / 100) * 1.5 * (timeToElapse / 7);
    _$SeverImpact = infectionsByRequestedTimeSeverImpact * (65 / 100) * 1.5 * (timeToElapse / 7);
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
    ICUByRequestedTimeImpact = (5 / 100) * infectionsByRequestedTimeImpact;
    ICUByRequestedTimeSeverImpact = (5 / 100) * infectionsByRequestedTimeSeverImpact;

    ventilatorByRequestedTimeImpact = (2 / 100) * infectionsByRequestedTimeImpact;
    ventilatorByRequestedTimeSeverImpact = (2 / 100) * infectionsByRequestedTimeSeverImpact;

    _$Impact = infectionsByRequestedTimeImpact * (65 / 100) * 1.5 * (timeToElapse / 30);
    _$SeverImpact = infectionsByRequestedTimeSeverImpact * (65 / 100) * 1.5 * (timeToElapse / 30);
  }

  return {
    data,
    impact: {
      casesForICUByRequestedTime: Math.trunc(ICUByRequestedTimeImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeImpact),
      dollarsInFlight: Math.trunc(_$Impact),
      hospitalBedsByRequestedTime: Math.trunc(availHosptBedsImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeImpact),
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      casesForICUByRequestedTime: Math.trunc(ICUByRequestedTimeSeverImpact),
      casesForVentilatorsByRequestedTime: Math.trunc(ventilatorByRequestedTimeSeverImpact),
      dollarsInFlight: Math.trunc(_$SeverImpact),
      hospitalBedsByRequestedTime: Math.trunc(availHospitBedsSeverImpact),
      severeCasesByRequestedTime: Math.trunc(severCasesByRequestedTimeSeverImpact),
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSeverImpact
    }
  };
};

export default covid19ImpactEstimator;
