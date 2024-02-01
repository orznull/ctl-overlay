import { useState, useEffect } from 'react'
import LeagueStats from './LeagueStats';

const PlayerIcon = (props) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [leagueStats, setLeagueStats] = useState(null);
  useEffect(() => {
    (async () => {
      if (!props.username)
        return;

      const response = await fetch(`https://corsproxy.io/?https://ch.tetr.io/api/users/${props.username.toLowerCase()}`);
      const res = await response.json();
      if (!res.success) {
        setAvatarUrl(null);
        return;
      }
      const u = res.data.user;
      setLeagueStats(u.league);
      if (u.avatar_revision) {
        setAvatarUrl(`https://tetr.io/user-content/avatars/${u._id}.jpg?rv=${u.avatar_revision}`);
      } else if (u.role === 'banned') {
        setAvatarUrl('https://tetr.io/res/avatar-banned.png');
      } else if (u.role !== 'anon') {
        setAvatarUrl(`data:image/svg+xml;base64,${new window.Identicon(window.MD5(u._id), {
          background: [0x08, 0x0A, 0x06, 255],
          margin: 0.15,
          size: 120,
          brightness: 0.48,
          saturation: 0.65,
          format: 'svg'
        }).toString()}`);
      }
    })();
  }, [props.username])

  const teamColor = props.teamColor || "white";
  const style = { ...props.pos };

  return (
    <div className="player-icon" style={style}>
      {avatarUrl ?
        <img className="player-icon-img" src={avatarUrl} style={{ borderColor: teamColor, opacity: props.eliminated ? 0.3 : 1 }} /> :
        <div className="player-icon-img" style={{ borderColor: teamColor }}></div>
      }
      {/*<svg
        width="100%"
        height="100%"
        viewBox="0 0 500 75"
        preserveAspectRatio="xMinYMid meet"
      >
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="75" fontWeight={"bold"}
          fill={teamColor}
        >{props.username}</text>
      </svg>*/}
      <div class="label" style={{ opacity: props.eliminated ? 0.6 : 1 }}>
        <svg
          width="200%"
          height="200%"
          viewBox="0 0 1000 75"
          preserveAspectRatio="xMinYMid meet"
        >
          <text
            x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="75" fontWeight={"bold"}
            fill={teamColor}
          >{props.username}</text>
        </svg>

      </div>
      <LeagueStats leagueStats={leagueStats} show={props.selected} />
      <div className="blurb" style={{
        display: props.blurb ? "block" : "none",
        opacity: props.selected ? 1 : 0,
        clipPath: props.selected ? 'inset(0px 0px 0px 0px)' : 'inset(0px 0px 100% 0px)',
        transitionDelay: props.selected ? "1s" : undefined,
        borderBottom: `solid 5px ${teamColor}`,
        borderTop: `solid 5px ${teamColor}`,
      }}>
        {props.blurb}
      </div>
    </div >
  )
}

export default PlayerIcon;
