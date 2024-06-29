# Add To Playlist (mtb)
## Documentation
- Class name: `Add To Playlist (mtb)`
- Category: `mtb/IO`
- Output node: `True`

This node facilitates the addition of videos to a specified playlist, allowing for the dynamic creation and updating of playlists based on user-defined parameters. It supports both relative and absolute path specifications for videos, and can handle persistent storage of playlists across sessions.
## Input types
### Required
- **`relative_paths`**
    - Determines whether the paths of videos added to the playlist should be relative to the output directory. This affects how the paths are stored and interpreted, facilitating easier relocation of the playlist and its contents.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`persistant_playlist`**
    - Indicates whether the playlist should be stored persistently across sessions. A persistent playlist is saved in a common directory, while a non-persistent one is saved in a session-specific directory.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`playlist_name`**
    - The name of the playlist, which can include formatting options such as an index. This allows for dynamic naming based on the playlist's contents or order.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`index`**
    - An integer used to format the playlist name, enabling the creation of sequentially named playlists or the organization of playlists by index.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_AddToPlaylist:
    """Add a video to the playlist"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "relative_paths": ("BOOLEAN", {"default": False}),
                "persistant_playlist": ("BOOLEAN", {"default": False}),
                "playlist_name": (
                    "STRING",
                    {"default": "playlist_{index:04d}"},
                ),
                "index": ("INT", {"default": 0, "min": 0}),
            }
        }

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = "add_to_playlist"
    CATEGORY = "mtb/IO"

    def add_to_playlist(
        self,
        relative_paths: bool,
        persistant_playlist: bool,
        playlist_name: str,
        index: int,
        **kwargs,
    ):
        playlist_name = playlist_name.format(index=index)
        playlist_path = get_playlist_path(playlist_name, persistant_playlist)

        if not playlist_path.parent.exists():
            playlist_path.parent.mkdir(parents=True, exist_ok=True)

        playlist = []
        if not playlist_path.exists():
            playlist_path.write_text("[]")
        else:
            playlist = json.loads(playlist_path.read_text())
        log.debug(f"Playlist {playlist_path} has {len(playlist)} items")
        for video in kwargs.values():
            if relative_paths:
                video = Path(video).relative_to(output_dir).as_posix()

            log.debug(f"Adding {video} to playlist")
            playlist.append(video)

        log.debug(f"Writing playlist {playlist_path}")
        playlist_path.write_text(json.dumps(playlist), encoding="utf-8")
        return ()

```
