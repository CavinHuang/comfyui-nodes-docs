# Read Playlist (mtb)
## Documentation
- Class name: `Read Playlist (mtb)`
- Category: `mtb/IO`
- Output node: `False`

The Read Playlist node is designed to facilitate the reading of playlists from a specified path, allowing for the retrieval of playlist contents based on the provided name and index. It supports conditional execution and persistence options to enhance flexibility in playlist management.
## Input types
### Required
- **`enable`**
    - Determines whether the reading of the playlist is enabled or not, acting as a conditional execution flag.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`persistant_playlist`**
    - Indicates whether the playlist should be read from a persistent storage location, affecting the path from which the playlist is loaded.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`playlist_name`**
    - The name of the playlist to read, which can include formatting for dynamic naming based on the index.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`index`**
    - An integer used to format the playlist name dynamically, allowing for indexed playlist management.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`playlist`**
    - Comfy dtype: `PLAYLIST`
    - The contents of the read playlist, returned as a list of playlist items.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_ReadPlaylist:
    """Read a playlist"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "enable": ("BOOLEAN", {"default": True}),
                "persistant_playlist": ("BOOLEAN", {"default": False}),
                "playlist_name": (
                    "STRING",
                    {"default": "playlist_{index:04d}"},
                ),
                "index": ("INT", {"default": 0, "min": 0}),
            }
        }

    RETURN_TYPES = ("PLAYLIST",)
    FUNCTION = "read_playlist"
    CATEGORY = "mtb/IO"

    def read_playlist(
        self,
        enable: bool,
        persistant_playlist: bool,
        playlist_name: str,
        index: int,
    ):
        playlist_name = playlist_name.format(index=index)
        playlist_path = get_playlist_path(playlist_name, persistant_playlist)
        if not enable:
            return (None,)

        if not playlist_path.exists():
            log.warning(f"Playlist {playlist_path} does not exist, skipping")
            return (None,)

        log.debug(f"Reading playlist {playlist_path}")
        return (json.loads(playlist_path.read_text(encoding="utf-8")),)

```
