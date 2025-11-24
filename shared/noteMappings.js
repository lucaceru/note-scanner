export const SOLFEGE_MAP = {
  C: "Do",
  D: "Ré",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

export function mapLettersToMeasures(fakeMeasures) {
  return fakeMeasures.map((m) => ({
    number: m.number,
    notes: m.letters.map((letter) => ({
      letter,
      solfege: SOLFEGE_MAP[letter] || "",
    })),
  }));
}
