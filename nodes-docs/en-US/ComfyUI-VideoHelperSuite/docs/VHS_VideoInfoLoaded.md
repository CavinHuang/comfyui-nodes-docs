---
tags:
- Multimedia
- VideoHelperSuite
---

# Video Info (Loaded) 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_VideoInfoLoaded`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_VideoInfoLoaded node is designed to extract and present detailed information about a video that has been loaded into the system. It focuses on providing metrics such as frame rate, frame count, video duration, and the dimensions of the video, facilitating a comprehensive understanding of the video's properties.
## Input types
### Required
- **`video_info`**
    - The 'video_info' parameter is crucial as it contains the loaded video's metadata, which is essential for extracting the video's detailed information such as fps, frame count, duration, width, and height. This metadata drives the node's execution and results.
    - Comfy dtype: `VHS_VIDEOINFO`
    - Python dtype: `dict`
## Output types
- **`fps🟦`**
    - Comfy dtype: `FLOAT`
    - Represents the frame rate of the loaded video.
    - Python dtype: `float`
- **`frame_count🟦`**
    - Comfy dtype: `INT`
    - Indicates the total number of frames in the loaded video.
    - Python dtype: `int`
- **`duration🟦`**
    - Comfy dtype: `FLOAT`
    - The total duration of the loaded video, typically in seconds.
    - Python dtype: `float`
- **`width🟦`**
    - Comfy dtype: `INT`
    - The width of the loaded video in pixels.
    - Python dtype: `int`
- **`height🟦`**
    - Comfy dtype: `INT`
    - The height of the loaded video in pixels.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VideoInfoLoaded:
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
        "fps🟦",
        "frame_count🟦",
        "duration🟦",
        "width🟦",
        "height🟦",
    )
    FUNCTION = "get_video_info"

    def get_video_info(self, video_info):
        keys = ["fps", "frame_count", "duration", "width", "height"]
        
        loaded_info = []

        for key in keys:
            loaded_info.append(video_info[f"loaded_{key}"])

        return (*loaded_info,)

```
