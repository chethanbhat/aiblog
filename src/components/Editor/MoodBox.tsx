export const Moods = ["none", "happy", "sad", "angry", "funny"];

const MoodBox = ({
  setMood,
  selectedMood,
}: {
  selectedMood: string;
  setMood: (m: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Moods.map((m) => (
        <Mood mood={m} setMood={setMood} selectedMood={selectedMood} />
      ))}
    </div>
  );
};

export default MoodBox;

export const Mood = ({
  mood,
  setMood,
  selectedMood,
}: {
  mood: string;
  selectedMood: string;
  setMood: (m: string) => void;
}) => {
  return (
    <div className="flex items-center">
      <input
        checked={mood === selectedMood}
        onChange={(e) => setMood(e.target.value)}
        value={mood}
        className="mr-2 cursor-pointer"
        type="radio"
        name="blogMood"
      />
      <label className="capitalize">{mood}</label>
    </div>
  );
};
