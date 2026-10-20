const activity = [
  ['Product designer role', 'Analysis complete - 78% match', '2 min ago'],
  ['Resume v4', 'New version saved to your library', 'Yesterday'],
  ['Growth strategist role', 'Interview prep generated', 'Oct 12'],
];

export default function ActivityFeed() { return <div className="activity-list">{activity.map(([title, copy, time]) => <div className="activity-item" key={title}><span className="activity-dot" /><div><strong>{title}</strong><p>{copy} <span>· {time}</span></p></div></div>)}</div>; }