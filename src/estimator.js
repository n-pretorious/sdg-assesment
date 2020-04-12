const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, timeToElapse } = input;

  const curInfected = reportedCases * 10;
  const sevImpact = reportedCases * 50;

  const oneWeek = (2 ** Math.trunc(7 / 3));
  const oneMonth = (2 ** 10);

  const totalDays = Math.trunc(timeToElapse / 3);
  const totalWeeks = Math.trunc(timeToElapse / 30);
  const totalMonths = Math.trunc(timeToElapse / 30);

  const infectionsByRequestedTimeImpact = curInfected * (2 ** totalDays) || curInfected * (oneWeek * totalWeeks) || curInfected * (oneMonth * totalMonths);
  const infectionsByRequestedTimeServerImpact = sevImpact * (2 ** totalDays) || sevImpact * (oneWeek * totalWeeks) || sevImpact * (oneMonth * totalMonths);

  return {
    data,
    impact: {
      currentlyInfected: curInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: sevImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeServerImpact
    }
  };
};

export default covid19ImpactEstimator;
