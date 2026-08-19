import { Component } from "react";

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
}

class Pomodoro extends Component<{}, PomodoroState> {
  state: PomodoroState = { timeLeft: 1500, isRunning: false };
  timerId: ReturnType<typeof setInterval> | null = null;

  startTimer = (): void => {
    if (this.state.isRunning || this.state.timeLeft <= 0) return;
    this.setState({ isRunning: true });

    this.timerId = setInterval(() => {
      this.setState((prev) => {
        if (prev.timeLeft <= 1) {
          if (this.timerId) clearInterval(this.timerId);
          return { timeLeft: 0, isRunning: false };
        }
        return { timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  pauseTimer = (): void => {
    if (this.timerId) clearInterval(this.timerId);
    this.setState({ isRunning: false });
  };

  resetTimer = (): void => {
    if (this.timerId) clearInterval(this.timerId);
    this.setState({ timeLeft: 1500, isRunning: false });
  };

  componentWillUnmount(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        <h1>{timeLeft === 0 ? "Hết giờ!" : this.formatTime(timeLeft)}</h1>
        <button onClick={this.startTimer}>Play</button>
        <button onClick={this.pauseTimer}>Pause</button>
        <button onClick={this.resetTimer}>Reset</button>
      </div>
    );
  }
}

export default Pomodoro;
