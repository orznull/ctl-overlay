import { useState, useEffect } from 'react'

const LeagueStats = (props) => {
  useEffect(() => {
    (async () => {
      if (!props.leagueStats)
        return;
      
    })();
  }, [props.leagueStats])
  
  if (!props.leagueStats)
    return;

  const containerStyle = { top: props.show? -120 : -68}
  const rankClippingStyle = { clipPath: props.show? 'inset(0px 0px 0px 0px)':'inset(65px 0px 0px 0px)' };
  const statsClippingStyle = { clipPath: props.show? 'inset(0px 0px 0px 0px)':'inset(0px 0px 65px 0px)' };
  const lineStyle = { width: props.show? '100%': 0}

  return (
    <div class='league-stats' style={containerStyle}>
      <div style={rankClippingStyle} class='rank-rating'>
        <img class='rank' src={`https://tetr.io/res/league-ranks/${props.leagueStats.rank}.png`} />
        <div class='rating'>
          {props.leagueStats.rating.toFixed(0)}
          <span class='tr-label'>TR</span>
        </div>
      </div>
      <div class='line' style={lineStyle}/>
      <div style={statsClippingStyle} class='stats'>
        <div><span>{props.leagueStats.apm.toFixed(2)}</span>APM</div>
        <div><span>{props.leagueStats.pps.toFixed(2)}</span> PPS</div>
        <div><span>{props.leagueStats.vs.toFixed(2)}</span> VS</div>
      </div>
    </div>
  )
}

export default LeagueStats;
