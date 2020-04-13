const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;
  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  const availableHospitalForSever = Math.trunc((35 / 100) * totalHospitalBeds);
  let infectionsByRequestedTimeImpact;
  let infectionsByRequestedTimeServerImpact;
  let requestedTime;
  let availHosptBedsImpact;
  let availHospitBedsSeverImpact;
  let severCasesByRequestedTimeImpact;
  let severCasesByRequestedTimeSeverImpact;

  if (periodType === 'days') {
    // challenge 1
    requestedTime = 2 ** Math.trunc(timeToElapse / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    Math.trunc(severCasesByRequestedTimeImpact);
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;
    Math.trunc(severCasesByRequestedTimeSeverImpact);

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;
  } else if (periodType === 'weeks') {
    // challenge 1
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenge 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    Math.trunc(severCasesByRequestedTimeImpact);
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;
    Math.trunc(severCasesByRequestedTimeSeverImpact);

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;
  } else {
    // challenge 1
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);
    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;

    // challenged 2
    severCasesByRequestedTimeImpact = (15 / 100) * infectionsByRequestedTimeImpact;
    Math.trunc(severCasesByRequestedTimeImpact);
    severCasesByRequestedTimeSeverImpact = (15 / 100) * infectionsByRequestedTimeServerImpact;
    Math.trunc(severCasesByRequestedTimeSeverImpact);

    availHosptBedsImpact = availableHospitalForSever - severCasesByRequestedTimeImpact;
    availHospitBedsSeverImpact = availableHospitalForSever - severCasesByRequestedTimeSeverImpact;
  }

  return {
    data,
    impact: {
      hospitalBedsByRequestedTime: availHosptBedsImpact,
      severeCasesByRequestedTime: severCasesByRequestedTimeImpact,
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      hospitalBedsByRequestedTime: availHospitBedsSeverImpact,
      severeCasesByRequestedTime: severCasesByRequestedTimeSeverImpact,
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeServerImpact
    }
  };
};

export default covid19ImpactEstimator;
