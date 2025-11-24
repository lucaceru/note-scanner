// Mapping from pitch names to solfege (French)
// For now: naturals + sharps. Flats can be added later.
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
};

// OLD helper (letters only) – still here if you need it
export function mapLettersToMeasures(fakeMeasures) {
  return fakeMeasures.map((m) => ({
    number: m.number,
    notes: m.letters.map((letter) => ({
      letter,
      solfege: SOLFEGE_MAP[letter] || "",
    })),
  }));
}

// NEW: parse a pitch string like "C4", "F#3", "G#5"
export function parsePitch(pitch) {
  if (!pitch || typeof pitch !== "string") {
    return { letter: "", solfege: "", octave: null };
  }

  // Example pitches: C4, F#3, G#5
  // Base letter (A-G)
  const base = pitch[0].toUpperCase();

  // Optional accidental (#). We ignore flats for now.
  let accidental = "";
  let rest = pitch.slice(1);

  if (rest[0] === "#") {
    accidental = "#";
    rest = rest.slice(1);
  }

  // Remaining part is octave (like "4")
  const octave = rest ? parseInt(rest, 10) : null;

  const key = base + accidental; // e.g. "F#"
  const solfege = SOLFEGE_MAP[key] || "";

  return {
    letter: key,   // e.g. "F#"
    solfege,       // e.g. "Fa♯"
    octave,        // e.g. 4
  };
}

// NEW: convert a "real-style" raw structure into the format the frontend expects
// rawMeasures: [
//   { number: 1, notes: [{ pitch: "C4" }, { pitch: "F#4" }] },
//   { number: 2, notes: [{ pitch: "G4" }] },
// ]
export function mapRawMeasuresToDisplay(rawMeasures) {
  if (!Array.isArray(rawMeasures)) return [];

  return rawMeasures.map((m) => ({
    number: m.number,
    notes: (m.notes || []).map((n) => {
      const parsed = parsePitch(n.pitch);
      return parsed;
    }),
  }));
}
