const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  let requestedTime;
  let infectionsByRequestedTimeImpact;
  let infectionsByRequestedTimeServerImpact;

  if (periodType === 'days') {
    requestedTime = 2 ** Math.trunc(timeToElapse / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;
  } else if (periodType === 'weeks') {
    requestedTime = 2 ** Math.trunc((7 * timeToElapse) / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;
  } else {
    requestedTime = 2 ** Math.trunc((30 * timeToElapse) / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * requestedTime;
    infectionsByRequestedTimeServerImpact = severeImpact * requestedTime;
  }

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeServerImpact
    }
  };
};

export default covid19ImpactEstimator;
