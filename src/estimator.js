const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, timeToElapse } = input;

  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  const totalRoundInOneWeek = (2 ** Math.trunc(7 / 3));
  const totalRoundInOneWeek = (2 ** 10);

  const totalNoOfDays = Math.trunc(timeToElapse / 3);
  const totalNoOfWeeks = Math.trunc(timeToElapse / 30);
  const totalNoOfMonths = Math.trunc(timeToElapse / 30);

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: currentlyInfected * (2 ** totalNoOfDays) || currentlyInfected * (totalRoundInOneWeek * totalNoOfWeeks) || currentlyInfected * (totalRoundInOneWeek * totalNoOfMonths)
    },
    severeImpact: {
      currentlyInfected: severeImpact,
      infectionsByRequestedTime: severeImpact * (2 ** totalNoOfDays) || severeImpact * (totalRoundInOneWeek * totalNoOfWeeks) || severeImpact * (totalRoundInOneWeek * totalNoOfMonths)
    }
  };
};

export default covid19ImpactEstimator;
