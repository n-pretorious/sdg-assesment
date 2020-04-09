const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, timeToElapse } = input;

  const totalDays = timeToElapse;
  const totalWeeks = Math.trunc(totalDays / 7);
  const totalMonths = Math.trunc(totalDays / 30);
  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  return {
    data,
    impact: {
      days: currentlyInfected * (2 ** Math.trunc(totalDays / 3)),
      weeks: currentlyInfected * ((2 ** Math.trunc(7 / 3)) * totalWeeks),
      months: currentlyInfected * ((2 ** 10) * totalMonths)
    },
    severeImpact: {
      days: severeImpact * (2 ** (totalDays / 3)),
      weeks: severeImpact * ((2 ** Math.trunc(7 / 3)) * totalWeeks),
      months: severeImpact * ((2 ** 10) * totalMonths)
    }
  };
};

export default covid19ImpactEstimator;
