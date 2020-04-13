const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;
  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  const availableHospitalForSever = Math.trunc(35 / 100) * totalHospitalBeds;
  let infectionsByRequestedTimeImpact;
  let infectionsByRequestedTimeServerImpact;
  let requestedTime;
  let availHosptBedsImpact;
  let availHospitBedsSeverImpact;
  let severCasesByRequestedTimeImpact;
  let severCasesByRequestedTimeSeverImpact;
  let hospitalBedsByRequestedTime;
  let severeCasesByRequestedTime;

  if (periodType === 'days') {
    // challenge 1
    requestedTime = 2 ** Math.trunc(timeToElapse / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    hospitalBedsByRequestedTime = Math.trunc(availHosptBedsImpact);
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;
    severeCasesByRequestedTime = Math.trunc(availHospitBedsSeverImpact);
  } else if (periodType === 'weeks') {
    // challenge 1
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    hospitalBedsByRequestedTime = Math.trunc(availHosptBedsImpact);
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;
    severeCasesByRequestedTime = Math.trunc(availHospitBedsSeverImpact);
  } else {
    // challenge 1
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenged 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    hospitalBedsByRequestedTime = Math.trunc(availHosptBedsImpact);
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;
    severeCasesByRequestedTime = Math.trunc(availHospitBedsSeverImpact);
  }

  return {
    data,
    impact: {
      hospitalBedsByRequestedTime,
      severeCasesByRequestedTime,
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      hospitalBedsByRequestedTime,
      severeCasesByRequestedTime,
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeServerImpact
    }
  };
};

export default covid19ImpactEstimator;
