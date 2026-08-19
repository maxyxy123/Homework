import { Component } from 'react';

interface ScoreBoardProps {
  score: number;
}

class ScoreBoard extends Component<ScoreBoardProps> {
  shouldComponentUpdate(nextProps: ScoreBoardProps): boolean {
    return nextProps.score !== this.props.score;
  }

  render() {
    return <h2>Điểm số: {this.props.score}</h2>;
  }
}

export default ScoreBoard;