---
tags:
- Multimedia
- VideoHelperSuite
---

# Video Info (Source) 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_VideoInfoSource`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_VideoInfoSource node is designed to extract and provide detailed information about the source video's characteristics, such as frame rate, frame count, duration, width, and height. It abstracts the complexity of video metadata extraction, offering a straightforward way to access essential video properties for further processing or analysis within the Video Helper Suite.
## Input types
### Required
- **`video_info`**
    - The 'video_info' parameter is essential for the operation of this node, as it contains the metadata of the source video from which information like fps, frame count, duration, width, and height are extracted. This metadata is crucial for accurately understanding and manipulating the video content.
    - Comfy dtype: `VHS_VIDEOINFO`
    - Python dtype: `dict`
## Output types
- **`fps🟨`**
    - Comfy dtype: `FLOAT`
    - Frames per second of the source video, indicating the video's playback speed.
    - Python dtype: `float`
- **`frame_count🟨`**
    - Comfy dtype: `INT`
    - Total number of frames in the source video.
    - Python dtype: `int`
- **`duration🟨`**
    - Comfy dtype: `FLOAT`
    - Total duration of the source video, typically in seconds.
    - Python dtype: `float`
- **`width🟨`**
    - Comfy dtype: `INT`
    - Width of the video in pixels.
    - Python dtype: `int`
- **`height🟨`**
    - Comfy dtype: `INT`
    - Height of the video in pixels.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VideoInfoSource:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "video_info": ("VHS_VIDEOINFO",),
                    }
                }

    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"

    RETURN_TYPES = ("FLOAT","INT", "FLOAT", "INT", "INT",)
    RETURN_NAMES = (
        "fps🟨",
        "frame_count🟨",
        "duration🟨",
        "width🟨",
        "height🟨",
    )
    FUNCTION = "get_video_info"

    def get_video_info(self, video_info):
        keys = ["fps", "frame_count", "duration", "width", "height"]
        
        source_info = []

        for key in keys:
            source_info.append(video_info[f"source_{key}"])

        return (*source_info,)

```
