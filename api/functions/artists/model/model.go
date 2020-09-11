package model

type Exception struct {
	Message string `json:"message"`
}

type Response struct {
	Artists []*Artist `json:"artists"`
}

type Artist struct {
	Id        string     `json:"id"`
	ImageUrl  string     `json:"imageUrl,omitempty"`
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
		Type          string         `json:"type,omitempty"`
		ID            string         `json:"id,omitempty"`
		Attributes    *Attributes    `json:"attributes,omitempty"`
		Relationships *Relationships `json:"relationships,omitempty"`
	} `json:"included,omitempty"`
}

type Attributes struct {
	ArtistBio        string `json:"artistBio,omitempty"`
	BornOrFormedDate string `json:"bornOrFormedDate,omitempty"`
	Kind             string `json:"kind,omitempty"`
	Name             string `json:"name,omitempty"`
	Origin           string `json:"origin,omitempty"`
	URL              string `json:"url,omitempty"`
}

type Relationships struct {
	Content *struct {
		Data []*struct {
			Type string `json:"type,omitempty"`
			ID   string `json:"id,omitempty"`
		} `json:"data,omitempty"`
	} `json:"content,omitempty"`
	ArtistContemporaries *struct {
		Data []*struct {
			Type string `json:"type,omitempty"`
			ID   string `json:"id,omitempty"`
		} `json:"data,omitempty"`
	} `json:"artistContemporaries,omitempty"`
}
