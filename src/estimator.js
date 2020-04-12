const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, timeToElapse } = input;

  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: currentlyInfected * (2 ** Math.trunc(timeToElapse / 3)) || currentlyInfected * ((2 ** Math.trunc(7 / 3)) * Math.trunc(timeToElapse / 30)) || currentlyInfected * ((2 ** 10) * Math.trunc(timeToElapse / 30))
    },
    severeImpact: {
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: severeImpact * (2 ** Math.trunc(timeToElapse / 3)) || severeImpact * ((2 ** Math.trunc(7 / 3)) * Math.trunc(timeToElapse / 30)) || severeImpact * ((2 ** 10) * Math.trunc(timeToElapse / 30))
    }
  };
};

export default covid19ImpactEstimator;
