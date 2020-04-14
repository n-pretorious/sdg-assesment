const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD,avgDailyIncomePopulation }
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
  const infectionsByReqTimeImpct = currentlyInfected * requestedTime;
  const infectionsByReqTimeSeverImpct = severeImpact * requestedTime;

  // challenged 2
  const severCasesByRequestedTimeImpact = 0.15 * infectionsByReqTimeImpct;
  const severCasesByRequestedTimeSeverImpact = 0.15 * infectionsByReqTimeSeverImpct;

  const availBedsImpact = availHospitalBeds - severCasesByRequestedTimeImpact;
  const availBedsSeverImpact = availHospitalBeds - severCasesByRequestedTimeSeverImpact;

  // challenge 3
  const icuByRequestedTimeImpact = 0.05 * infectionsByReqTimeImpct;
  const icuByRequestedTimeSeverImpact = 0.05 * infectionsByReqTimeSeverImpct;

  const ventilatorByRequestedTimeImpact = 0.02 * infectionsByReqTimeImpct;
  const ventilatorByRequestedTimeSeverImpact = 0.02 * infectionsByReqTimeSeverImpct;

  const avgIncome = avgDailyIncomeInUSD;
  const avgPop = avgDailyIncomePopulation;
  const dolImpact = (infectionsByReqTimeImpct * avgIncome * avgPop) / timeToElapse;
  const dolSeverImpact = (infectionsByReqTimeSeverImpct * avgIncome * avgPop) / timeToElapse;

  return {
    data,
    impact: {
      // challenge 1
      currentlyInfected,
      infectionsByRequestedTime: infectionsByReqTimeImpct,
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
      infectionsByRequestedTime: infectionsByReqTimeSeverImpct,
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
