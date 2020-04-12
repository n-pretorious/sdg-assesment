const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;

  const currentlyInfected = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  const infectionsByRequestedTimeImpact, infectionsByRequestedTimeServerImpact;

  if (periodType === "days") {
    const totalDays = Math.trunc(timeToElapse / 3);

    infectionsByRequestedTimeImpact = currentlyInfected * (2 ** totalDays);
    infectionsByRequestedTimeServerImpact = severeImpact * (2 ** totalDays);

  } else if (periodType === "weeks") {
    const oneWeek = (2 ** Math.trunc(7 / 3));
    const totalWeeks = Math.trunc(timeToElapse / 30);

    infectionsByRequestedTimeImpact = currentlyInfected * (oneWeek * totalWeeks);
    infectionsByRequestedTimeServerImpact = severeImpact * (oneWeek * totalWeeks);

  } else {
    const oneMonth = (2 ** 10);
    const totalMonths = Math.trunc(timeToElapse / 30);

    infectionsByRequestedTimeImpact = currentlyInfected * (oneMonth * totalMonths);
    infectionsByRequestedTimeServerImpact = severeImpact * (oneMonth * totalMonths);

  };

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
