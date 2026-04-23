import {useTimer} from "../hooks/useTimer"

const format = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;

  return `${m}:${r.toString().padStart(2, "0")}`;
};

type Props = {
    readonly startedAt?: number;
}

export function Timer({ startedAt }: Props) {
    const elapsed = useTimer(startedAt);

    return <span className="timer">{format(elapsed)}</span>
}