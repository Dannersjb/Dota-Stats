import (

  "github.com/dotabuff/manta"
  "github.com/dotabuff/manta/dota"
)

func main() {
  //F:\Program Files (x86)\SteamLibrary\steamapps\common\dota 2 beta\game\dota\replays
  // Create a new parser instance from a file. Alternatively see NewParser([]byte)
  f, err := os.Open("my_replay.dem")
  if err != nil {
    log.Fatalf("unable to open file: %s", err)
  }
  defer f.Close()

  p, err := manta.NewStreamParser(f)
  if err != nil {
    log.Fatalf("unable to create parser: %s", err)
  }

  // Register a callback, this time for the OnCUserMessageSayText2 event.
  p.Callbacks.OnCUserMessageSayText2(func(m *dota.CUserMessageSayText2) error {
    log.Printf("%s said: %s\n", m.GetParam1(), m.GetParam2())
    return nil
  })

  // Start parsing the replay!
  p.Start()

  log.Printf("Parse Complete!\n")
}