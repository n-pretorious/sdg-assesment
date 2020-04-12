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

  const currentRequestedDay = currentlyInfected * (2 ** totalDays);
  const currentRequestedWeek = currentlyInfected * (oneWeek * totalWeeks);
  const currentRequestedMonth = currentlyInfected * (oneMonth * totalMonths);

  const severeRequestedDay = severeImpact * (2 ** totalDays);
  const severRequestedWeek = severeImpact * (oneWeek * totalWeeks);
  const severRequestedMonth = severeImpact * (oneMonth * totalMonths);

  const infectionsByRequestedTimeImpact = currentRequestedDay || currentRequestedWeek || currentRequestedMonth;
  const infectionsByRequestedTimeServerImpact = severeRequestedDay || severRequestedWeek || severRequestedMonth;

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
