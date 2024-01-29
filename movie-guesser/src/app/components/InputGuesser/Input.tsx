type InputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Input({
  value,
  onChange,
  onKeyDown,
  onClick,
}: InputProps) {
  return (
    <div className="flex flex-row w-1/2">
      <input
        className="border-2 border-black rounded-md w-96 mr-2 shadow-lg flex"
        type="text"
        placeholder="Take a guess!"
        value={value || ""}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name="currentGuess"
      />
      <button
        className="border-2 border-black rounded-md p-2 shadow-lg hover:bg-gray-300"
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  );
}
