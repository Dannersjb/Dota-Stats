// Code generated by protoc-gen-go.
// source: demo.proto
// DO NOT EDIT!

package dota

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type EDemoCommands int32

const (
	EDemoCommands_DEM_Error               EDemoCommands = -1
	EDemoCommands_DEM_Stop                EDemoCommands = 0
	EDemoCommands_DEM_FileHeader          EDemoCommands = 1
	EDemoCommands_DEM_FileInfo            EDemoCommands = 2
	EDemoCommands_DEM_SyncTick            EDemoCommands = 3
	EDemoCommands_DEM_SendTables          EDemoCommands = 4
	EDemoCommands_DEM_ClassInfo           EDemoCommands = 5
	EDemoCommands_DEM_StringTables        EDemoCommands = 6
	EDemoCommands_DEM_Packet              EDemoCommands = 7
	EDemoCommands_DEM_SignonPacket        EDemoCommands = 8
	EDemoCommands_DEM_ConsoleCmd          EDemoCommands = 9
	EDemoCommands_DEM_CustomData          EDemoCommands = 10
	EDemoCommands_DEM_CustomDataCallbacks EDemoCommands = 11
	EDemoCommands_DEM_UserCmd             EDemoCommands = 12
	EDemoCommands_DEM_FullPacket          EDemoCommands = 13
	EDemoCommands_DEM_SaveGame            EDemoCommands = 14
	EDemoCommands_DEM_SpawnGroups         EDemoCommands = 15
	EDemoCommands_DEM_Max                 EDemoCommands = 16
	EDemoCommands_DEM_IsCompressed        EDemoCommands = 64
)

var EDemoCommands_name = map[int32]string{
	-1: "DEM_Error",
	0:  "DEM_Stop",
	1:  "DEM_FileHeader",
	2:  "DEM_FileInfo",
	3:  "DEM_SyncTick",
	4:  "DEM_SendTables",
	5:  "DEM_ClassInfo",
	6:  "DEM_StringTables",
	7:  "DEM_Packet",
	8:  "DEM_SignonPacket",
	9:  "DEM_ConsoleCmd",
	10: "DEM_CustomData",
	11: "DEM_CustomDataCallbacks",
	12: "DEM_UserCmd",
	13: "DEM_FullPacket",
	14: "DEM_SaveGame",
	15: "DEM_SpawnGroups",
	16: "DEM_Max",
	64: "DEM_IsCompressed",
}
var EDemoCommands_value = map[string]int32{
	"DEM_Error":               -1,
	"DEM_Stop":                0,
	"DEM_FileHeader":          1,
	"DEM_FileInfo":            2,
	"DEM_SyncTick":            3,
	"DEM_SendTables":          4,
	"DEM_ClassInfo":           5,
	"DEM_StringTables":        6,
	"DEM_Packet":              7,
	"DEM_SignonPacket":        8,
	"DEM_ConsoleCmd":          9,
	"DEM_CustomData":          10,
	"DEM_CustomDataCallbacks": 11,
	"DEM_UserCmd":             12,
	"DEM_FullPacket":          13,
	"DEM_SaveGame":            14,
	"DEM_SpawnGroups":         15,
	"DEM_Max":                 16,
	"DEM_IsCompressed":        64,
}

func (x EDemoCommands) Enum() *EDemoCommands {
	p := new(EDemoCommands)
	*p = x
	return p
}
func (x EDemoCommands) String() string {
	return proto.EnumName(EDemoCommands_name, int32(x))
}
func (x *EDemoCommands) UnmarshalJSON(data []byte) error {
	value, err := proto.UnmarshalJSONEnum(EDemoCommands_value, data, "EDemoCommands")
	if err != nil {
		return err
	}
	*x = EDemoCommands(value)
	return nil
}
func (EDemoCommands) EnumDescriptor() ([]byte, []int) { return fileDescriptor4, []int{0} }

type CDemoFileHeader struct {
	DemoFileStamp            *string `protobuf:"bytes,1,req,name=demo_file_stamp,json=demoFileStamp" json:"demo_file_stamp,omitempty"`
	NetworkProtocol          *int32  `protobuf:"varint,2,opt,name=network_protocol,json=networkProtocol" json:"network_protocol,omitempty"`
	ServerName               *string `protobuf:"bytes,3,opt,name=server_name,json=serverName" json:"server_name,omitempty"`
	ClientName               *string `protobuf:"bytes,4,opt,name=client_name,json=clientName" json:"client_name,omitempty"`
	MapName                  *string `protobuf:"bytes,5,opt,name=map_name,json=mapName" json:"map_name,omitempty"`
	GameDirectory            *string `protobuf:"bytes,6,opt,name=game_directory,json=gameDirectory" json:"game_directory,omitempty"`
	FullpacketsVersion       *int32  `protobuf:"varint,7,opt,name=fullpackets_version,json=fullpacketsVersion" json:"fullpackets_version,omitempty"`
	AllowClientsideEntities  *bool   `protobuf:"varint,8,opt,name=allow_clientside_entities,json=allowClientsideEntities" json:"allow_clientside_entities,omitempty"`
	AllowClientsideParticles *bool   `protobuf:"varint,9,opt,name=allow_clientside_particles,json=allowClientsideParticles" json:"allow_clientside_particles,omitempty"`
	Addons                   *string `protobuf:"bytes,10,opt,name=addons" json:"addons,omitempty"`
	XXX_unrecognized         []byte  `json:"-"`
}

func (m *CDemoFileHeader) Reset()                    { *m = CDemoFileHeader{} }
func (m *CDemoFileHeader) String() string            { return proto.CompactTextString(m) }
func (*CDemoFileHeader) ProtoMessage()               {}
func (*CDemoFileHeader) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{0} }

func (m *CDemoFileHeader) GetDemoFileStamp() string {
	if m != nil && m.DemoFileStamp != nil {
		return *m.DemoFileStamp
	}
	return ""
}

func (m *CDemoFileHeader) GetNetworkProtocol() int32 {
	if m != nil && m.NetworkProtocol != nil {
		return *m.NetworkProtocol
	}
	return 0
}

func (m *CDemoFileHeader) GetServerName() string {
	if m != nil && m.ServerName != nil {
		return *m.ServerName
	}
	return ""
}

func (m *CDemoFileHeader) GetClientName() string {
	if m != nil && m.ClientName != nil {
		return *m.ClientName
	}
	return ""
}

func (m *CDemoFileHeader) GetMapName() string {
	if m != nil && m.MapName != nil {
		return *m.MapName
	}
	return ""
}

func (m *CDemoFileHeader) GetGameDirectory() string {
	if m != nil && m.GameDirectory != nil {
		return *m.GameDirectory
	}
	return ""
}

func (m *CDemoFileHeader) GetFullpacketsVersion() int32 {
	if m != nil && m.FullpacketsVersion != nil {
		return *m.FullpacketsVersion
	}
	return 0
}

func (m *CDemoFileHeader) GetAllowClientsideEntities() bool {
	if m != nil && m.AllowClientsideEntities != nil {
		return *m.AllowClientsideEntities
	}
	return false
}

func (m *CDemoFileHeader) GetAllowClientsideParticles() bool {
	if m != nil && m.AllowClientsideParticles != nil {
		return *m.AllowClientsideParticles
	}
	return false
}

func (m *CDemoFileHeader) GetAddons() string {
	if m != nil && m.Addons != nil {
		return *m.Addons
	}
	return ""
}

type CGameInfo struct {
	Dota             *CGameInfo_CDotaGameInfo `protobuf:"bytes,4,opt,name=dota" json:"dota,omitempty"`
	XXX_unrecognized []byte                   `json:"-"`
}

func (m *CGameInfo) Reset()                    { *m = CGameInfo{} }
func (m *CGameInfo) String() string            { return proto.CompactTextString(m) }
func (*CGameInfo) ProtoMessage()               {}
func (*CGameInfo) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{1} }

func (m *CGameInfo) GetDota() *CGameInfo_CDotaGameInfo {
	if m != nil {
		return m.Dota
	}
	return nil
}

type CGameInfo_CDotaGameInfo struct {
	MatchId          *uint64                                     `protobuf:"varint,1,opt,name=match_id,json=matchId" json:"match_id,omitempty"`
	GameMode         *int32                                      `protobuf:"varint,2,opt,name=game_mode,json=gameMode" json:"game_mode,omitempty"`
	GameWinner       *int32                                      `protobuf:"varint,3,opt,name=game_winner,json=gameWinner" json:"game_winner,omitempty"`
	PlayerInfo       []*CGameInfo_CDotaGameInfo_CPlayerInfo      `protobuf:"bytes,4,rep,name=player_info,json=playerInfo" json:"player_info,omitempty"`
	Leagueid         *uint32                                     `protobuf:"varint,5,opt,name=leagueid" json:"leagueid,omitempty"`
	PicksBans        []*CGameInfo_CDotaGameInfo_CHeroSelectEvent `protobuf:"bytes,6,rep,name=picks_bans,json=picksBans" json:"picks_bans,omitempty"`
	RadiantTeamId    *uint32                                     `protobuf:"varint,7,opt,name=radiant_team_id,json=radiantTeamId" json:"radiant_team_id,omitempty"`
	DireTeamId       *uint32                                     `protobuf:"varint,8,opt,name=dire_team_id,json=direTeamId" json:"dire_team_id,omitempty"`
	RadiantTeamTag   *string                                     `protobuf:"bytes,9,opt,name=radiant_team_tag,json=radiantTeamTag" json:"radiant_team_tag,omitempty"`
	DireTeamTag      *string                                     `protobuf:"bytes,10,opt,name=dire_team_tag,json=direTeamTag" json:"dire_team_tag,omitempty"`
	EndTime          *uint32                                     `protobuf:"varint,11,opt,name=end_time,json=endTime" json:"end_time,omitempty"`
	XXX_unrecognized []byte                                      `json:"-"`
}

func (m *CGameInfo_CDotaGameInfo) Reset()                    { *m = CGameInfo_CDotaGameInfo{} }
func (m *CGameInfo_CDotaGameInfo) String() string            { return proto.CompactTextString(m) }
func (*CGameInfo_CDotaGameInfo) ProtoMessage()               {}
func (*CGameInfo_CDotaGameInfo) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{1, 0} }

func (m *CGameInfo_CDotaGameInfo) GetMatchId() uint64 {
	if m != nil && m.MatchId != nil {
		return *m.MatchId
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo) GetGameMode() int32 {
	if m != nil && m.GameMode != nil {
		return *m.GameMode
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo) GetGameWinner() int32 {
	if m != nil && m.GameWinner != nil {
		return *m.GameWinner
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo) GetPlayerInfo() []*CGameInfo_CDotaGameInfo_CPlayerInfo {
	if m != nil {
		return m.PlayerInfo
	}
	return nil
}

func (m *CGameInfo_CDotaGameInfo) GetLeagueid() uint32 {
	if m != nil && m.Leagueid != nil {
		return *m.Leagueid
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo) GetPicksBans() []*CGameInfo_CDotaGameInfo_CHeroSelectEvent {
	if m != nil {
		return m.PicksBans
	}
	return nil
}

func (m *CGameInfo_CDotaGameInfo) GetRadiantTeamId() uint32 {
	if m != nil && m.RadiantTeamId != nil {
		return *m.RadiantTeamId
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo) GetDireTeamId() uint32 {
	if m != nil && m.DireTeamId != nil {
		return *m.DireTeamId
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo) GetRadiantTeamTag() string {
	if m != nil && m.RadiantTeamTag != nil {
		return *m.RadiantTeamTag
	}
	return ""
}

func (m *CGameInfo_CDotaGameInfo) GetDireTeamTag() string {
	if m != nil && m.DireTeamTag != nil {
		return *m.DireTeamTag
	}
	return ""
}

func (m *CGameInfo_CDotaGameInfo) GetEndTime() uint32 {
	if m != nil && m.EndTime != nil {
		return *m.EndTime
	}
	return 0
}

type CGameInfo_CDotaGameInfo_CPlayerInfo struct {
	HeroName         *string `protobuf:"bytes,1,opt,name=hero_name,json=heroName" json:"hero_name,omitempty"`
	PlayerName       *string `protobuf:"bytes,2,opt,name=player_name,json=playerName" json:"player_name,omitempty"`
	IsFakeClient     *bool   `protobuf:"varint,3,opt,name=is_fake_client,json=isFakeClient" json:"is_fake_client,omitempty"`
	Steamid          *uint64 `protobuf:"varint,4,opt,name=steamid" json:"steamid,omitempty"`
	GameTeam         *int32  `protobuf:"varint,5,opt,name=game_team,json=gameTeam" json:"game_team,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) Reset()         { *m = CGameInfo_CDotaGameInfo_CPlayerInfo{} }
func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) String() string { return proto.CompactTextString(m) }
func (*CGameInfo_CDotaGameInfo_CPlayerInfo) ProtoMessage()    {}
func (*CGameInfo_CDotaGameInfo_CPlayerInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor4, []int{1, 0, 0}
}

func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) GetHeroName() string {
	if m != nil && m.HeroName != nil {
		return *m.HeroName
	}
	return ""
}

func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) GetPlayerName() string {
	if m != nil && m.PlayerName != nil {
		return *m.PlayerName
	}
	return ""
}

func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) GetIsFakeClient() bool {
	if m != nil && m.IsFakeClient != nil {
		return *m.IsFakeClient
	}
	return false
}

func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) GetSteamid() uint64 {
	if m != nil && m.Steamid != nil {
		return *m.Steamid
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo_CPlayerInfo) GetGameTeam() int32 {
	if m != nil && m.GameTeam != nil {
		return *m.GameTeam
	}
	return 0
}

type CGameInfo_CDotaGameInfo_CHeroSelectEvent struct {
	IsPick           *bool   `protobuf:"varint,1,opt,name=is_pick,json=isPick" json:"is_pick,omitempty"`
	Team             *uint32 `protobuf:"varint,2,opt,name=team" json:"team,omitempty"`
	HeroId           *uint32 `protobuf:"varint,3,opt,name=hero_id,json=heroId" json:"hero_id,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *CGameInfo_CDotaGameInfo_CHeroSelectEvent) Reset() {
	*m = CGameInfo_CDotaGameInfo_CHeroSelectEvent{}
}
func (m *CGameInfo_CDotaGameInfo_CHeroSelectEvent) String() string { return proto.CompactTextString(m) }
func (*CGameInfo_CDotaGameInfo_CHeroSelectEvent) ProtoMessage()    {}
func (*CGameInfo_CDotaGameInfo_CHeroSelectEvent) Descriptor() ([]byte, []int) {
	return fileDescriptor4, []int{1, 0, 1}
}

func (m *CGameInfo_CDotaGameInfo_CHeroSelectEvent) GetIsPick() bool {
	if m != nil && m.IsPick != nil {
		return *m.IsPick
	}
	return false
}

func (m *CGameInfo_CDotaGameInfo_CHeroSelectEvent) GetTeam() uint32 {
	if m != nil && m.Team != nil {
		return *m.Team
	}
	return 0
}

func (m *CGameInfo_CDotaGameInfo_CHeroSelectEvent) GetHeroId() uint32 {
	if m != nil && m.HeroId != nil {
		return *m.HeroId
	}
	return 0
}

type CDemoFileInfo struct {
	PlaybackTime     *float32   `protobuf:"fixed32,1,opt,name=playback_time,json=playbackTime" json:"playback_time,omitempty"`
	PlaybackTicks    *int32     `protobuf:"varint,2,opt,name=playback_ticks,json=playbackTicks" json:"playback_ticks,omitempty"`
	PlaybackFrames   *int32     `protobuf:"varint,3,opt,name=playback_frames,json=playbackFrames" json:"playback_frames,omitempty"`
	GameInfo         *CGameInfo `protobuf:"bytes,4,opt,name=game_info,json=gameInfo" json:"game_info,omitempty"`
	XXX_unrecognized []byte     `json:"-"`
}

func (m *CDemoFileInfo) Reset()                    { *m = CDemoFileInfo{} }
func (m *CDemoFileInfo) String() string            { return proto.CompactTextString(m) }
func (*CDemoFileInfo) ProtoMessage()               {}
func (*CDemoFileInfo) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{2} }

func (m *CDemoFileInfo) GetPlaybackTime() float32 {
	if m != nil && m.PlaybackTime != nil {
		return *m.PlaybackTime
	}
	return 0
}

func (m *CDemoFileInfo) GetPlaybackTicks() int32 {
	if m != nil && m.PlaybackTicks != nil {
		return *m.PlaybackTicks
	}
	return 0
}

func (m *CDemoFileInfo) GetPlaybackFrames() int32 {
	if m != nil && m.PlaybackFrames != nil {
		return *m.PlaybackFrames
	}
	return 0
}

func (m *CDemoFileInfo) GetGameInfo() *CGameInfo {
	if m != nil {
		return m.GameInfo
	}
	return nil
}

type CDemoPacket struct {
	SequenceIn       *int32 `protobuf:"varint,1,opt,name=sequence_in,json=sequenceIn" json:"sequence_in,omitempty"`
	SequenceOutAck   *int32 `protobuf:"varint,2,opt,name=sequence_out_ack,json=sequenceOutAck" json:"sequence_out_ack,omitempty"`
	Data             []byte `protobuf:"bytes,3,opt,name=data" json:"data,omitempty"`
	XXX_unrecognized []byte `json:"-"`
}

func (m *CDemoPacket) Reset()                    { *m = CDemoPacket{} }
func (m *CDemoPacket) String() string            { return proto.CompactTextString(m) }
func (*CDemoPacket) ProtoMessage()               {}
func (*CDemoPacket) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{3} }

func (m *CDemoPacket) GetSequenceIn() int32 {
	if m != nil && m.SequenceIn != nil {
		return *m.SequenceIn
	}
	return 0
}

func (m *CDemoPacket) GetSequenceOutAck() int32 {
	if m != nil && m.SequenceOutAck != nil {
		return *m.SequenceOutAck
	}
	return 0
}

func (m *CDemoPacket) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

type CDemoFullPacket struct {
	StringTable      *CDemoStringTables `protobuf:"bytes,1,opt,name=string_table,json=stringTable" json:"string_table,omitempty"`
	Packet           *CDemoPacket       `protobuf:"bytes,2,opt,name=packet" json:"packet,omitempty"`
	XXX_unrecognized []byte             `json:"-"`
}

func (m *CDemoFullPacket) Reset()                    { *m = CDemoFullPacket{} }
func (m *CDemoFullPacket) String() string            { return proto.CompactTextString(m) }
func (*CDemoFullPacket) ProtoMessage()               {}
func (*CDemoFullPacket) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{4} }

func (m *CDemoFullPacket) GetStringTable() *CDemoStringTables {
	if m != nil {
		return m.StringTable
	}
	return nil
}

func (m *CDemoFullPacket) GetPacket() *CDemoPacket {
	if m != nil {
		return m.Packet
	}
	return nil
}

type CDemoSaveGame struct {
	Data             []byte  `protobuf:"bytes,1,opt,name=data" json:"data,omitempty"`
	SteamId          *uint64 `protobuf:"fixed64,2,opt,name=steam_id,json=steamId" json:"steam_id,omitempty"`
	Signature        *uint64 `protobuf:"fixed64,3,opt,name=signature" json:"signature,omitempty"`
	Version          *int32  `protobuf:"varint,4,opt,name=version" json:"version,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *CDemoSaveGame) Reset()                    { *m = CDemoSaveGame{} }
func (m *CDemoSaveGame) String() string            { return proto.CompactTextString(m) }
func (*CDemoSaveGame) ProtoMessage()               {}
func (*CDemoSaveGame) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{5} }

func (m *CDemoSaveGame) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

func (m *CDemoSaveGame) GetSteamId() uint64 {
	if m != nil && m.SteamId != nil {
		return *m.SteamId
	}
	return 0
}

func (m *CDemoSaveGame) GetSignature() uint64 {
	if m != nil && m.Signature != nil {
		return *m.Signature
	}
	return 0
}

func (m *CDemoSaveGame) GetVersion() int32 {
	if m != nil && m.Version != nil {
		return *m.Version
	}
	return 0
}

type CDemoSyncTick struct {
	XXX_unrecognized []byte `json:"-"`
}

func (m *CDemoSyncTick) Reset()                    { *m = CDemoSyncTick{} }
func (m *CDemoSyncTick) String() string            { return proto.CompactTextString(m) }
func (*CDemoSyncTick) ProtoMessage()               {}
func (*CDemoSyncTick) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{6} }

type CDemoConsoleCmd struct {
	Cmdstring        *string `protobuf:"bytes,1,opt,name=cmdstring" json:"cmdstring,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *CDemoConsoleCmd) Reset()                    { *m = CDemoConsoleCmd{} }
func (m *CDemoConsoleCmd) String() string            { return proto.CompactTextString(m) }
func (*CDemoConsoleCmd) ProtoMessage()               {}
func (*CDemoConsoleCmd) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{7} }

func (m *CDemoConsoleCmd) GetCmdstring() string {
	if m != nil && m.Cmdstring != nil {
		return *m.Cmdstring
	}
	return ""
}

type CDemoSendTables struct {
	Data             []byte `protobuf:"bytes,1,opt,name=data" json:"data,omitempty"`
	XXX_unrecognized []byte `json:"-"`
}

func (m *CDemoSendTables) Reset()                    { *m = CDemoSendTables{} }
func (m *CDemoSendTables) String() string            { return proto.CompactTextString(m) }
func (*CDemoSendTables) ProtoMessage()               {}
func (*CDemoSendTables) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{8} }

func (m *CDemoSendTables) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

type CDemoClassInfo struct {
	Classes          []*CDemoClassInfoClassT `protobuf:"bytes,1,rep,name=classes" json:"classes,omitempty"`
	XXX_unrecognized []byte                  `json:"-"`
}

func (m *CDemoClassInfo) Reset()                    { *m = CDemoClassInfo{} }
func (m *CDemoClassInfo) String() string            { return proto.CompactTextString(m) }
func (*CDemoClassInfo) ProtoMessage()               {}
func (*CDemoClassInfo) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{9} }

func (m *CDemoClassInfo) GetClasses() []*CDemoClassInfoClassT {
	if m != nil {
		return m.Classes
	}
	return nil
}

type CDemoClassInfoClassT struct {
	ClassId          *int32  `protobuf:"varint,1,opt,name=class_id,json=classId" json:"class_id,omitempty"`
	NetworkName      *string `protobuf:"bytes,2,opt,name=network_name,json=networkName" json:"network_name,omitempty"`
	TableName        *string `protobuf:"bytes,3,opt,name=table_name,json=tableName" json:"table_name,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *CDemoClassInfoClassT) Reset()                    { *m = CDemoClassInfoClassT{} }
func (m *CDemoClassInfoClassT) String() string            { return proto.CompactTextString(m) }
func (*CDemoClassInfoClassT) ProtoMessage()               {}
func (*CDemoClassInfoClassT) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{9, 0} }

func (m *CDemoClassInfoClassT) GetClassId() int32 {
	if m != nil && m.ClassId != nil {
		return *m.ClassId
	}
	return 0
}

func (m *CDemoClassInfoClassT) GetNetworkName() string {
	if m != nil && m.NetworkName != nil {
		return *m.NetworkName
	}
	return ""
}

func (m *CDemoClassInfoClassT) GetTableName() string {
	if m != nil && m.TableName != nil {
		return *m.TableName
	}
	return ""
}

type CDemoCustomData struct {
	CallbackIndex    *int32 `protobuf:"varint,1,opt,name=callback_index,json=callbackIndex" json:"callback_index,omitempty"`
	Data             []byte `protobuf:"bytes,2,opt,name=data" json:"data,omitempty"`
	XXX_unrecognized []byte `json:"-"`
}

func (m *CDemoCustomData) Reset()                    { *m = CDemoCustomData{} }
func (m *CDemoCustomData) String() string            { return proto.CompactTextString(m) }
func (*CDemoCustomData) ProtoMessage()               {}
func (*CDemoCustomData) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{10} }

func (m *CDemoCustomData) GetCallbackIndex() int32 {
	if m != nil && m.CallbackIndex != nil {
		return *m.CallbackIndex
	}
	return 0
}

func (m *CDemoCustomData) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

type CDemoCustomDataCallbacks struct {
	SaveId           []string `protobuf:"bytes,1,rep,name=save_id,json=saveId" json:"save_id,omitempty"`
	XXX_unrecognized []byte   `json:"-"`
}

func (m *CDemoCustomDataCallbacks) Reset()                    { *m = CDemoCustomDataCallbacks{} }
func (m *CDemoCustomDataCallbacks) String() string            { return proto.CompactTextString(m) }
func (*CDemoCustomDataCallbacks) ProtoMessage()               {}
func (*CDemoCustomDataCallbacks) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{11} }

func (m *CDemoCustomDataCallbacks) GetSaveId() []string {
	if m != nil {
		return m.SaveId
	}
	return nil
}

type CDemoStringTables struct {
	Tables           []*CDemoStringTablesTableT `protobuf:"bytes,1,rep,name=tables" json:"tables,omitempty"`
	XXX_unrecognized []byte                     `json:"-"`
}

func (m *CDemoStringTables) Reset()                    { *m = CDemoStringTables{} }
func (m *CDemoStringTables) String() string            { return proto.CompactTextString(m) }
func (*CDemoStringTables) ProtoMessage()               {}
func (*CDemoStringTables) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{12} }

func (m *CDemoStringTables) GetTables() []*CDemoStringTablesTableT {
	if m != nil {
		return m.Tables
	}
	return nil
}

type CDemoStringTablesItemsT struct {
	Str              *string `protobuf:"bytes,1,opt,name=str" json:"str,omitempty"`
	Data             []byte  `protobuf:"bytes,2,opt,name=data" json:"data,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *CDemoStringTablesItemsT) Reset()                    { *m = CDemoStringTablesItemsT{} }
func (m *CDemoStringTablesItemsT) String() string            { return proto.CompactTextString(m) }
func (*CDemoStringTablesItemsT) ProtoMessage()               {}
func (*CDemoStringTablesItemsT) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{12, 0} }

func (m *CDemoStringTablesItemsT) GetStr() string {
	if m != nil && m.Str != nil {
		return *m.Str
	}
	return ""
}

func (m *CDemoStringTablesItemsT) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

type CDemoStringTablesTableT struct {
	TableName        *string                    `protobuf:"bytes,1,opt,name=table_name,json=tableName" json:"table_name,omitempty"`
	Items            []*CDemoStringTablesItemsT `protobuf:"bytes,2,rep,name=items" json:"items,omitempty"`
	ItemsClientside  []*CDemoStringTablesItemsT `protobuf:"bytes,3,rep,name=items_clientside,json=itemsClientside" json:"items_clientside,omitempty"`
	TableFlags       *int32                     `protobuf:"varint,4,opt,name=table_flags,json=tableFlags" json:"table_flags,omitempty"`
	XXX_unrecognized []byte                     `json:"-"`
}

func (m *CDemoStringTablesTableT) Reset()                    { *m = CDemoStringTablesTableT{} }
func (m *CDemoStringTablesTableT) String() string            { return proto.CompactTextString(m) }
func (*CDemoStringTablesTableT) ProtoMessage()               {}
func (*CDemoStringTablesTableT) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{12, 1} }

func (m *CDemoStringTablesTableT) GetTableName() string {
	if m != nil && m.TableName != nil {
		return *m.TableName
	}
	return ""
}

func (m *CDemoStringTablesTableT) GetItems() []*CDemoStringTablesItemsT {
	if m != nil {
		return m.Items
	}
	return nil
}

func (m *CDemoStringTablesTableT) GetItemsClientside() []*CDemoStringTablesItemsT {
	if m != nil {
		return m.ItemsClientside
	}
	return nil
}

func (m *CDemoStringTablesTableT) GetTableFlags() int32 {
	if m != nil && m.TableFlags != nil {
		return *m.TableFlags
	}
	return 0
}

type CDemoStop struct {
	XXX_unrecognized []byte `json:"-"`
}

func (m *CDemoStop) Reset()                    { *m = CDemoStop{} }
func (m *CDemoStop) String() string            { return proto.CompactTextString(m) }
func (*CDemoStop) ProtoMessage()               {}
func (*CDemoStop) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{13} }

type CDemoUserCmd struct {
	CmdNumber        *int32 `protobuf:"varint,1,opt,name=cmd_number,json=cmdNumber" json:"cmd_number,omitempty"`
	Data             []byte `protobuf:"bytes,2,opt,name=data" json:"data,omitempty"`
	XXX_unrecognized []byte `json:"-"`
}

func (m *CDemoUserCmd) Reset()                    { *m = CDemoUserCmd{} }
func (m *CDemoUserCmd) String() string            { return proto.CompactTextString(m) }
func (*CDemoUserCmd) ProtoMessage()               {}
func (*CDemoUserCmd) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{14} }

func (m *CDemoUserCmd) GetCmdNumber() int32 {
	if m != nil && m.CmdNumber != nil {
		return *m.CmdNumber
	}
	return 0
}

func (m *CDemoUserCmd) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

type CDemoSpawnGroups struct {
	Msgs             [][]byte `protobuf:"bytes,3,rep,name=msgs" json:"msgs,omitempty"`
	XXX_unrecognized []byte   `json:"-"`
}

func (m *CDemoSpawnGroups) Reset()                    { *m = CDemoSpawnGroups{} }
func (m *CDemoSpawnGroups) String() string            { return proto.CompactTextString(m) }
func (*CDemoSpawnGroups) ProtoMessage()               {}
func (*CDemoSpawnGroups) Descriptor() ([]byte, []int) { return fileDescriptor4, []int{15} }

func (m *CDemoSpawnGroups) GetMsgs() [][]byte {
	if m != nil {
		return m.Msgs
	}
	return nil
}

func init() {
	proto.RegisterType((*CDemoFileHeader)(nil), "dota.CDemoFileHeader")
	proto.RegisterType((*CGameInfo)(nil), "dota.CGameInfo")
	proto.RegisterType((*CGameInfo_CDotaGameInfo)(nil), "dota.CGameInfo.CDotaGameInfo")
	proto.RegisterType((*CGameInfo_CDotaGameInfo_CPlayerInfo)(nil), "dota.CGameInfo.CDotaGameInfo.CPlayerInfo")
	proto.RegisterType((*CGameInfo_CDotaGameInfo_CHeroSelectEvent)(nil), "dota.CGameInfo.CDotaGameInfo.CHeroSelectEvent")
	proto.RegisterType((*CDemoFileInfo)(nil), "dota.CDemoFileInfo")
	proto.RegisterType((*CDemoPacket)(nil), "dota.CDemoPacket")
	proto.RegisterType((*CDemoFullPacket)(nil), "dota.CDemoFullPacket")
	proto.RegisterType((*CDemoSaveGame)(nil), "dota.CDemoSaveGame")
	proto.RegisterType((*CDemoSyncTick)(nil), "dota.CDemoSyncTick")
	proto.RegisterType((*CDemoConsoleCmd)(nil), "dota.CDemoConsoleCmd")
	proto.RegisterType((*CDemoSendTables)(nil), "dota.CDemoSendTables")
	proto.RegisterType((*CDemoClassInfo)(nil), "dota.CDemoClassInfo")
	proto.RegisterType((*CDemoClassInfoClassT)(nil), "dota.CDemoClassInfo.class_t")
	proto.RegisterType((*CDemoCustomData)(nil), "dota.CDemoCustomData")
	proto.RegisterType((*CDemoCustomDataCallbacks)(nil), "dota.CDemoCustomDataCallbacks")
	proto.RegisterType((*CDemoStringTables)(nil), "dota.CDemoStringTables")
	proto.RegisterType((*CDemoStringTablesItemsT)(nil), "dota.CDemoStringTables.items_t")
	proto.RegisterType((*CDemoStringTablesTableT)(nil), "dota.CDemoStringTables.table_t")
	proto.RegisterType((*CDemoStop)(nil), "dota.CDemoStop")
	proto.RegisterType((*CDemoUserCmd)(nil), "dota.CDemoUserCmd")
	proto.RegisterType((*CDemoSpawnGroups)(nil), "dota.CDemoSpawnGroups")
	proto.RegisterEnum("dota.EDemoCommands", EDemoCommands_name, EDemoCommands_value)
}

func init() { proto.RegisterFile("demo.proto", fileDescriptor4) }

var fileDescriptor4 = []byte{
	// 1407 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x56, 0xcb, 0x8e, 0x1b, 0x45,
	0x17, 0x4e, 0xfb, 0xee, 0xd3, 0xbe, 0x74, 0x2a, 0xbf, 0xfe, 0xe9, 0x38, 0x89, 0x32, 0x34, 0x24,
	0x38, 0x08, 0x39, 0x62, 0x10, 0x20, 0x45, 0x2c, 0x48, 0x3c, 0x33, 0x89, 0x23, 0x26, 0x8c, 0x7a,
	0x86, 0xcb, 0xae, 0x55, 0xd3, 0x5d, 0x76, 0x5a, 0xee, 0x8b, 0xe9, 0x2a, 0xcf, 0x24, 0x3b, 0x16,
	0x3c, 0x04, 0x8f, 0x80, 0xc4, 0x06, 0xf1, 0x1c, 0xd9, 0xf3, 0x38, 0xa0, 0x73, 0xaa, 0xba, 0xed,
	0x4c, 0x42, 0xc0, 0xab, 0xaa, 0xef, 0x7c, 0x75, 0xea, 0xd4, 0x77, 0x2e, 0x6e, 0x80, 0x48, 0xa4,
	0xf9, 0x64, 0x55, 0xe4, 0x2a, 0x67, 0x8d, 0x28, 0x57, 0xdc, 0xfb, 0xad, 0x0e, 0xc3, 0xe9, 0xbe,
	0x48, 0xf3, 0xc3, 0x38, 0x11, 0x4f, 0x04, 0x8f, 0x44, 0xc1, 0xee, 0xc2, 0x10, 0x79, 0xc1, 0x3c,
	0x4e, 0x44, 0x20, 0x15, 0x4f, 0x57, 0xae, 0xb5, 0x5b, 0x1b, 0x77, 0xfd, 0x7e, 0x64, 0x88, 0x27,
	0x08, 0xb2, 0x7b, 0xe0, 0x64, 0x42, 0x5d, 0xe4, 0xc5, 0x32, 0x20, 0x97, 0x61, 0x9e, 0xb8, 0xb5,
	0x5d, 0x6b, 0xdc, 0xf4, 0x87, 0x06, 0x3f, 0x36, 0x30, 0xbb, 0x0d, 0xb6, 0x14, 0xc5, 0xb9, 0x28,
	0x82, 0x8c, 0xa7, 0xc2, 0xad, 0xef, 0x5a, 0xe3, 0xae, 0x0f, 0x1a, 0x7a, 0xc6, 0x53, 0x81, 0x84,
	0x30, 0x89, 0x45, 0xa6, 0x34, 0xa1, 0xa1, 0x09, 0x1a, 0x22, 0xc2, 0x75, 0xe8, 0xa4, 0x7c, 0xa5,
	0xad, 0x4d, 0xb2, 0xb6, 0x53, 0xbe, 0x22, 0xd3, 0x1d, 0x18, 0x2c, 0x78, 0x2a, 0x82, 0x28, 0x2e,
	0x44, 0xa8, 0xf2, 0xe2, 0xa5, 0xdb, 0x22, 0x42, 0x1f, 0xd1, 0xfd, 0x12, 0x64, 0xf7, 0xe1, 0xda,
	0x7c, 0x9d, 0x24, 0x2b, 0x1e, 0x2e, 0x85, 0x92, 0xc1, 0xb9, 0x28, 0x64, 0x9c, 0x67, 0x6e, 0x9b,
	0x22, 0x66, 0x5b, 0xa6, 0xef, 0xb4, 0x85, 0x3d, 0x80, 0xeb, 0x3c, 0x49, 0xf2, 0x8b, 0x40, 0x87,
	0x21, 0xe3, 0x48, 0x04, 0x22, 0x53, 0xb1, 0x8a, 0x85, 0x74, 0x3b, 0xbb, 0xd6, 0xb8, 0xe3, 0xef,
	0x10, 0x61, 0x5a, 0xd9, 0x0f, 0x8c, 0x99, 0x7d, 0x09, 0xa3, 0x37, 0xce, 0xae, 0x78, 0xa1, 0xe2,
	0x30, 0x11, 0xd2, 0xed, 0xd2, 0x61, 0xf7, 0xd2, 0xe1, 0xe3, 0xd2, 0xce, 0xfe, 0x0f, 0x2d, 0x1e,
	0x45, 0x79, 0x26, 0x5d, 0xa0, 0x97, 0x98, 0x9d, 0xf7, 0x4b, 0x0b, 0xba, 0xd3, 0xc7, 0x3c, 0x15,
	0xb3, 0x6c, 0x9e, 0xb3, 0x4f, 0x80, 0x72, 0x48, 0x62, 0xd9, 0x7b, 0xb7, 0x26, 0xb8, 0x99, 0x54,
	0xe6, 0xc9, 0x74, 0x3f, 0x57, 0xbc, 0xdc, 0xf9, 0x44, 0x1d, 0xfd, 0xd9, 0x84, 0xfe, 0x6b, 0xb8,
	0xd6, 0x55, 0x85, 0xcf, 0x83, 0x38, 0x72, 0xad, 0x5d, 0x6b, 0xdc, 0x40, 0x5d, 0x55, 0xf8, 0x7c,
	0x16, 0xb1, 0x1b, 0xd0, 0x25, 0x5d, 0xd3, 0x3c, 0x12, 0x26, 0xb1, 0x1d, 0x04, 0x8e, 0xf2, 0x88,
	0x12, 0x46, 0xc6, 0x8b, 0x38, 0xcb, 0x44, 0x41, 0x19, 0x6d, 0xfa, 0x80, 0xd0, 0xf7, 0x84, 0xb0,
	0xa7, 0x60, 0xaf, 0x12, 0xfe, 0x52, 0x14, 0x41, 0x9c, 0xcd, 0x73, 0xb7, 0xb1, 0x5b, 0x1f, 0xdb,
	0x7b, 0xf7, 0xde, 0x19, 0xe4, 0x64, 0x7a, 0x4c, 0x27, 0x28, 0x60, 0x58, 0x55, 0x6b, 0x36, 0x82,
	0x4e, 0x22, 0xf8, 0x62, 0x2d, 0xe2, 0x88, 0x92, 0xdf, 0xf7, 0xab, 0x3d, 0x3b, 0x02, 0x58, 0xc5,
	0xe1, 0x52, 0x06, 0x67, 0x3c, 0x93, 0x6e, 0x8b, 0xae, 0x99, 0xfc, 0xcb, 0x35, 0x4f, 0x44, 0x91,
	0x9f, 0x88, 0x44, 0x84, 0xea, 0xe0, 0x5c, 0x64, 0xca, 0xef, 0x92, 0x87, 0x47, 0x3c, 0x93, 0x58,
	0xfc, 0x05, 0x8f, 0x62, 0x9e, 0xa9, 0x40, 0x09, 0x9e, 0xa2, 0x2c, 0x6d, 0xba, 0xb1, 0x6f, 0xe0,
	0x53, 0xc1, 0xd3, 0x59, 0xc4, 0x76, 0xa1, 0x87, 0xf5, 0x56, 0x91, 0x3a, 0x44, 0x02, 0xc4, 0x0c,
	0x63, 0x0c, 0xce, 0x6b, 0x9e, 0x14, 0x5f, 0x50, 0xe2, 0xbb, 0xfe, 0x60, 0xcb, 0xd5, 0x29, 0x5f,
	0x30, 0x0f, 0xfa, 0x1b, 0x5f, 0x48, 0xd3, 0x59, 0xb7, 0x4b, 0x67, 0xc8, 0xb9, 0x0e, 0x1d, 0x91,
	0x45, 0x81, 0x8a, 0x53, 0xe1, 0xda, 0x74, 0x57, 0x5b, 0x64, 0xd1, 0x69, 0x9c, 0x8a, 0xd1, 0xaf,
	0x16, 0xd8, 0x5b, 0xca, 0x61, 0xde, 0x9e, 0x8b, 0x22, 0xd7, 0xbd, 0x62, 0x91, 0xab, 0x0e, 0x02,
	0x65, 0xa3, 0x99, 0xb4, 0x90, 0xb9, 0xa6, 0x1b, 0x4d, 0x43, 0x44, 0xf8, 0x00, 0x06, 0xb1, 0x0c,
	0xe6, 0x7c, 0x29, 0x4c, 0xed, 0x52, 0x6e, 0x3b, 0x7e, 0x2f, 0x96, 0x87, 0x7c, 0x29, 0x74, 0xb9,
	0x32, 0x17, 0xda, 0x12, 0xc3, 0x8d, 0x23, 0x2a, 0xbf, 0x86, 0x5f, 0x6e, 0xab, 0xaa, 0xc1, 0x2d,
	0x25, 0xcb, 0x54, 0x0d, 0x3e, 0x64, 0xf4, 0x03, 0x38, 0x97, 0xc5, 0x67, 0x3b, 0xd0, 0x8e, 0x65,
	0x80, 0x19, 0xa0, 0x60, 0x3b, 0x7e, 0x2b, 0x96, 0xc7, 0x71, 0xb8, 0x64, 0x0c, 0x1a, 0xe4, 0xa4,
	0x46, 0xcf, 0xa5, 0x35, 0x92, 0xe9, 0x6d, 0x71, 0x44, 0x61, 0xf5, 0xfd, 0x16, 0x6e, 0x67, 0x91,
	0xf7, 0x87, 0x85, 0x95, 0x6d, 0xe6, 0x13, 0xc9, 0xf0, 0x3e, 0xf4, 0xf1, 0x59, 0x67, 0x3c, 0x5c,
	0x6a, 0xd9, 0xd0, 0x7b, 0xcd, 0xef, 0x95, 0x20, 0x6a, 0x87, 0xb3, 0x63, 0x8b, 0x14, 0x2e, 0xa5,
	0x29, 0xf4, 0xfe, 0x86, 0x15, 0x2e, 0x25, 0xfb, 0x10, 0x86, 0x15, 0x6d, 0x5e, 0xf0, 0x54, 0x48,
	0x53, 0xf1, 0xd5, 0xe9, 0x43, 0x42, 0xd9, 0xc7, 0xe6, 0xf5, 0xa6, 0xe6, 0xb1, 0x31, 0x87, 0x97,
	0x8a, 0x51, 0xcb, 0x81, 0x2b, 0x2f, 0x01, 0x9b, 0x62, 0x3e, 0xa6, 0xc1, 0xa3, 0xa7, 0xe4, 0x8f,
	0x6b, 0x91, 0x85, 0xe8, 0x80, 0xe2, 0x6d, 0xe2, 0x94, 0xd4, 0xd0, 0x2c, 0xc3, 0x92, 0xaa, 0x08,
	0xf9, 0x5a, 0x05, 0x3c, 0x5c, 0x9a, 0x78, 0x07, 0x25, 0xfe, 0xcd, 0x5a, 0x3d, 0xd4, 0xda, 0x45,
	0x5c, 0x71, 0x8a, 0xb2, 0xe7, 0xd3, 0xda, 0x7b, 0x51, 0x8e, 0xfa, 0x75, 0x92, 0x98, 0x1b, 0x1f,
	0x40, 0x4f, 0xaa, 0x22, 0xce, 0x16, 0x81, 0xe2, 0x67, 0x89, 0x96, 0xc8, 0xde, 0xdb, 0x31, 0x11,
	0x23, 0xf9, 0x84, 0xcc, 0xa7, 0x68, 0x95, 0xbe, 0x2d, 0x37, 0x3b, 0x76, 0x0f, 0x5a, 0x7a, 0x60,
	0x52, 0x08, 0xf6, 0xde, 0xd5, 0xad, 0x53, 0xda, 0xbd, 0x6f, 0x08, 0xde, 0xb9, 0xc9, 0xcd, 0x09,
	0x3f, 0x17, 0x28, 0x43, 0x15, 0x9e, 0xb5, 0x09, 0x0f, 0x2b, 0x5c, 0x96, 0xdd, 0x84, 0x1e, 0x5b,
	0xa6, 0xa6, 0x66, 0x11, 0xbb, 0x09, 0x5d, 0x19, 0x2f, 0x32, 0xae, 0xd6, 0x85, 0xfe, 0xf3, 0x68,
	0xf9, 0x1b, 0x00, 0x6b, 0xb1, 0x1c, 0xe6, 0x0d, 0x12, 0xa3, 0xdc, 0x7a, 0xc3, 0xf2, 0xde, 0x97,
	0x59, 0x88, 0x89, 0xf4, 0xee, 0x1b, 0x09, 0xa6, 0x79, 0x26, 0xf3, 0x44, 0x4c, 0x53, 0xf2, 0x1d,
	0xa6, 0x91, 0x7e, 0x98, 0xe9, 0x96, 0x0d, 0xe0, 0xdd, 0x31, 0x07, 0x4e, 0xb0, 0xd9, 0x48, 0x84,
	0xb7, 0xc5, 0xee, 0xfd, 0x6e, 0xc1, 0x40, 0x3b, 0x4e, 0xb8, 0x94, 0x54, 0x7e, 0x9f, 0x43, 0x3b,
	0xc4, 0x8d, 0x90, 0xae, 0x45, 0x43, 0xe9, 0xe6, 0x96, 0x3e, 0x15, 0x6d, 0x42, 0x9c, 0x40, 0xf9,
	0x25, 0x79, 0x34, 0x37, 0xe7, 0x02, 0x85, 0x8a, 0xe8, 0xa5, 0x99, 0xcd, 0x4d, 0xc3, 0x9a, 0x45,
	0xec, 0x3d, 0xe8, 0x95, 0xff, 0xbd, 0x5b, 0x7d, 0x6c, 0x1b, 0x8c, 0x1a, 0xf9, 0x16, 0x00, 0x25,
	0x75, 0xfb, 0x2f, 0xb7, 0x4b, 0x08, 0x9a, 0xbd, 0xaf, 0x4b, 0x29, 0xd6, 0x52, 0xe5, 0xe9, 0x3e,
	0x66, 0xe0, 0x0e, 0x0c, 0x42, 0x9e, 0x24, 0x54, 0xe5, 0x71, 0x16, 0x89, 0x17, 0xe6, 0xd6, 0x7e,
	0x89, 0xce, 0x10, 0xac, 0x04, 0xa8, 0x6d, 0x09, 0xf0, 0x29, 0xb8, 0x97, 0xbc, 0x4d, 0xcd, 0x19,
	0x89, 0x3d, 0x2b, 0xf9, 0xb9, 0xd0, 0xaf, 0xa8, 0xe3, 0xdf, 0x19, 0x6e, 0x67, 0x91, 0xf7, 0xaa,
	0x06, 0x57, 0xdf, 0x28, 0x32, 0xf6, 0x05, 0xb4, 0x28, 0xca, 0x52, 0xb7, 0xdb, 0xff, 0x50, 0x8d,
	0x13, 0xfd, 0x3a, 0xe5, 0x1b, 0xfa, 0xe8, 0x3e, 0xb4, 0x63, 0x25, 0x52, 0x54, 0xce, 0x81, 0xba,
	0x54, 0x85, 0x49, 0x27, 0x2e, 0xdf, 0x16, 0xf4, 0xe8, 0x95, 0x05, 0x6d, 0xe3, 0xe4, 0x92, 0x5a,
	0xd6, 0x25, 0xb5, 0xd8, 0x67, 0xd0, 0x24, 0xdf, 0x6e, 0xed, 0xdd, 0x31, 0x99, 0x00, 0x7c, 0xcd,
	0x66, 0x4f, 0xc1, 0xd1, 0xc8, 0xe6, 0x33, 0xc0, 0xad, 0xff, 0x37, 0x0f, 0x43, 0x5a, 0x6c, 0xbe,
	0x0e, 0x70, 0x3a, 0xe8, 0x08, 0xe7, 0x09, 0x5f, 0x48, 0x53, 0xea, 0x3a, 0xe8, 0x43, 0x44, 0x3c,
	0x1b, 0xba, 0xc6, 0x5d, 0xbe, 0xf2, 0x1e, 0x42, 0x8f, 0x36, 0xdf, 0x4a, 0x51, 0x60, 0x99, 0xdf,
	0x02, 0x08, 0xd3, 0x28, 0xc8, 0xd6, 0xe9, 0x99, 0x28, 0x4c, 0x5e, 0xb1, 0xce, 0x9f, 0x11, 0xf0,
	0xd6, 0x9c, 0xde, 0x05, 0x47, 0xfb, 0x5b, 0xf1, 0x8b, 0xec, 0x71, 0x91, 0xaf, 0x57, 0x54, 0xfc,
	0xa9, 0x5c, 0x48, 0x7a, 0x44, 0xcf, 0xa7, 0xf5, 0x47, 0x3f, 0xd7, 0xa1, 0x7f, 0xa0, 0xbb, 0x2a,
	0x4d, 0x79, 0x16, 0xe1, 0xf7, 0x4b, 0x77, 0xff, 0xe0, 0x28, 0x38, 0x28, 0x8a, 0xbc, 0x70, 0xfe,
	0x2a, 0x7f, 0x16, 0xeb, 0x41, 0x07, 0x71, 0x0c, 0xd0, 0xb9, 0xc2, 0x18, 0x0c, 0x70, 0xb7, 0xf9,
	0xf2, 0x74, 0x2c, 0xe6, 0x40, 0xaf, 0xc4, 0xb0, 0x3d, 0x9c, 0x5a, 0x89, 0x94, 0x2d, 0xec, 0xd4,
	0xcb, 0x73, 0x9b, 0x96, 0x74, 0x1a, 0xec, 0x2a, 0xf4, 0x11, 0xab, 0xfa, 0xca, 0x69, 0xb2, 0xff,
	0x81, 0xa3, 0x2f, 0xdb, 0x88, 0xeb, 0xb4, 0xd8, 0x00, 0x00, 0x51, 0x3d, 0xa0, 0x9c, 0x76, 0xc5,
	0x8a, 0x17, 0x59, 0x9e, 0x19, 0xb4, 0x53, 0x5e, 0xb1, 0x19, 0x13, 0x4e, 0xb7, 0xc2, 0xaa, 0x0a,
	0x77, 0x80, 0xdd, 0x80, 0x9d, 0xd7, 0xb1, 0xaa, 0xea, 0x1d, 0x9b, 0x0d, 0xc1, 0x46, 0xa3, 0xc9,
	0x80, 0xd3, 0xab, 0x1e, 0x5c, 0xcd, 0x5f, 0xa7, 0x5f, 0x3d, 0xcf, 0x4c, 0x46, 0x67, 0xc0, 0xae,
	0xc1, 0x90, 0x90, 0x8d, 0xea, 0xce, 0x90, 0xd9, 0xd0, 0x46, 0xf0, 0x88, 0xbf, 0x70, 0x9c, 0x32,
	0xe6, 0x99, 0x9c, 0xe6, 0xe9, 0xaa, 0x10, 0x52, 0x8a, 0xc8, 0xf9, 0xea, 0x51, 0xfd, 0x27, 0xeb,
	0xca, 0xdf, 0x01, 0x00, 0x00, 0xff, 0xff, 0x40, 0x7f, 0xb5, 0x2f, 0xe2, 0x0b, 0x00, 0x00,
}
