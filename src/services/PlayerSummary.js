function getBestHeroes(resultPlayer) {
    console.log("PlayerSummary getBestHeroes");
    let oBestheroes = {
      BestHeroes: [
        {
          id: 0,
          imgId: 0,
          winCount: 0,
          lossCount: 0,
          lastPlayedDateTime: 0,
          activity: false,
        },
      ],
    };
    if (resultPlayer.player.heroesPerformance) {
      for (
        let i = 0;
        i < resultPlayer.player.heroesPerformance.length;
        i++
      ) {
        oBestheroes.BestHeroes.push({
          id: resultPlayer.player.heroesPerformance[i].heroId,
          imgId: resultPlayer.player.heroesPerformance[i].heroId,
          winCount: resultPlayer.player.heroesPerformance[i].winCount,
          lossCount:
            resultPlayer.player.heroesPerformance[i].lossCount,
          lastPlayedDateTime:
            resultPlayer.player.heroesPerformance[i]
              .lastPlayedDateTime,
          activity:
            parseInt(new Date().getTime() / 1000) -
              resultPlayer.player.heroesPerformance[i]
                .lastPlayedDateTime <
            5259486,
        });
      }
      oBestheroes.BestHeroes.sort((a, b) =>
        a.winCount > b.winCount ? 1 : -1
      );
    }
    return oBestheroes;
  };
  function getSimpleSummary(resultPlayer) {
    let oSimpleSummary = {
      Simpleheroes: [
        {
          id: 0,
          winCount: 0,
          lossCount: 0,
        },
      ],
    };
    if (resultPlayer.player.simpleSummary.heroes) {
      for (
        let i = 0;
        i < resultPlayer.player.simpleSummary.heroes.length;
        i++
      ) {
        oSimpleSummary.Simpleheroes.push({
          id: resultPlayer.player.simpleSummary.heroes[i].heroId,
          imgId: resultPlayer.player.simpleSummary.heroes[i].heroId,
          winCount:
          resultPlayer.player.simpleSummary.heroes[i].winCount,
          lossCount:
          resultPlayer.player.simpleSummary.heroes[i].lossCount,
        });
      }
    }
    console.log("oSimpleSummary store " + JSON.stringify(oSimpleSummary));
    return oSimpleSummary;
  };

  export { getBestHeroes, getSimpleSummary };