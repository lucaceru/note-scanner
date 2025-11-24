// Mapping from pitch names to solfege (French)
// Later, when we plug in a real scanner, we will feed it
// real notes like "F#", "G#", etc. and this will still work.

export const SOLFEGE_MAP = {
  C: "Do",
  "C#": "Do♯",
  D: "Ré",
  "D#": "Ré♯",
  E: "Mi",
  F: "Fa",
  "F#": "Fa♯",
  G: "Sol",
  "G#": "Sol♯",
  A: "La",
  "A#": "La♯",
  B: "Si",
  // we can add flats like "Bb": "Si♭" later if needed
};

// Takes an array of measures like:
// [{ number: 1, letters: ["C", "D", "F#", "G"] }, ...]
// and returns a normalized structure with letter + solfege.
export function mapLettersToMeasures(fakeMeasures) {
  return fakeMeasures.map((m) => ({
    number: m.number,
    notes: m.letters.map((letter) => ({
      letter,
      solfege: SOLFEGE_MAP[letter] || "",
    })),
  }));
}
