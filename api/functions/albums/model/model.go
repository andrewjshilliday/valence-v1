package model

type Exception struct {
	Message string `json:"message"`
}

type Response struct {
	Albums []*Album `json:"albums"`
}

type Album struct {
	Id        string     `json:"id"`
	Resources *Resources `json:"resources,omitempty"`
}

type Resources struct {
	Data *struct {
		Type          string         `json:"type,omitempty"`
		ID            string         `json:"id,omitempty"`
		Attributes    *Attributes    `json:"attributes,omitempty"`
		Relationships *Relationships `json:"relationships,omitempty"`
	} `json:"data,omitempty"`
	Included []*struct {
		Type       string      `json:"type,omitempty"`
		ID         string      `json:"id,omitempty"`
		Attributes *Attributes `json:"attributes,omitempty"`
	} `json:"included,omitempty"`
}

type Attributes struct {
	ArtistId         string  `json:"artistId,omitempty"`
	ArtistName       string  `json:"artistName,omitempty"`
	ArtistURL        string  `json:"artistUrl,omitempty"`
	BornOrFormedDate string  `json:"bornOrFormedDate,omitempty"`
	Kind             string  `json:"kind,omitempty"`
	Name             string  `json:"name,omitempty"`
	Origin           string  `json:"origin,omitempty"`
	Popularity       float64 `json:"popularity,omitempty"`
	ReleaseDate      string  `json:"releaseDate,omitempty"`
	TrackCount       int     `json:"trackCount,omitempty"`
	TrackNumber      int     `json:"trackNumber,omitempty"`
	Type             string  `json:"type,omitempty"`
	Url              string  `json:"url,omitempty"`
	Variant          string  `json:"variant,omitempty"`
}

type Relationships struct {
	Artist *struct {
		Data *struct {
			Type string `json:"type,omitempty"`
			ID   string `json:"id,omitempty"`
		} `json:"data,omitempty"`
	} `json:"artist,omitempty"`
	ListenersAlsoBought *struct {
		Data []*struct {
			Type string `json:"type,omitempty"`
			ID   string `json:"id,omitempty"`
		} `json:"data,omitempty"`
	} `json:"listenersAlsoBought,omitempty"`
	Songs *struct {
		Data []*struct {
			Type string `json:"type,omitempty"`
			ID   string `json:"id,omitempty"`
		} `json:"data,omitempty"`
	} `json:"songs,omitempty"`
	TopAlbums *struct {
		Data []*struct {
			Type string `json:"type,omitempty"`
			ID   string `json:"id,omitempty"`
		} `json:"data,omitempty"`
	} `json:"topAlbums,omitempty"`
}
