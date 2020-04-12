const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, timeToElapse } = input;

  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  const oneWeek = (2 ** Math.trunc(7 / 3));
  const oneMonth = (2 ** 10);

  const totalDays = Math.trunc(timeToElapse / 3);
  const totalWeeks = Math.trunc(timeToElapse / 30);
  const totalMonths = Math.trunc(timeToElapse / 30);

  const currentDay = currentlyInfected * (2 ** totalDays);
  const currentWeek = currentlyInfected * (oneWeek * totalWeeks);
  const currentMonth = currentlyInfected * (oneMonth * totalMonths);

  const severeDay = severeImpact * (2 ** totalDays);
  const severWeek = severeImpact * (oneWeek * totalWeeks);
  const severMonth = severeImpact * (oneMonth * totalMonths);

  const infectionsByRequestedTimeImpact = currentDay || currentWeek || currentMonth;
  const infectionsByRequestedTimeServerImpact = severeDay || severWeek || severMonth;

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
