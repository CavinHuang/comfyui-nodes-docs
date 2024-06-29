---
tags:
- Image
- Multimedia
---

# Vid Dir Iterator
## Documentation
- Class name: `VidDirIterator`
- Category: `cspnodes`
- Output node: `False`

The VidDirIterator node is designed to navigate through directories containing video files, allowing for the retrieval of video file paths based on their index. This functionality facilitates the organization and selection of video content within a specified directory, streamlining the process of accessing and utilizing video files in various applications.
## Input types
### Required
- **`directory_path`**
    - Specifies the path to the directory containing video files. This path is crucial for the node to locate and list the video files for further operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`video_index`**
    - Determines the index of the video file to retrieve from the sorted list of video files in the directory. This index is used to select a specific video file, enabling targeted access to video content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the path to the video file at the specified index within the directory. This output facilitates direct access to the selected video file for further processing or playback.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VidDirIterator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {}),
                "video_index": ("INT", {"default": 0})
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_video_path_by_index"
    CATEGORY = "cspnodes"

    def get_video_path_by_index(self, directory_path, video_index):
        # Get list of video files sorted by modification time (most recent first)
        video_files = sorted(
            [os.path.join(directory_path, f) for f in os.listdir(directory_path)
             if f.lower().endswith(('.mov', '.mp4'))],
            key=lambda x: os.path.getmtime(x),
            reverse=True
        )

        # Wrap the index around using modulo
        video_index = video_index % len(video_files)

        # Return the video file path as a string
        return (video_files[video_index],)

```
