---
tags:
- Multimedia
- VideoHelperSuite
---

# Load Video (Path) 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_LoadVideoPath`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_LoadVideoPath node facilitates the loading of video files from specified paths for integration into a video processing workflow. It ensures the video file is accessible, validates the path, and prepares the video for subsequent processing or analysis tasks within the Video Helper Suite.
## Input types
### Required
- **`video`**
    - Specifies the path to the video file to be loaded, enabling the node to access and process the video.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`force_rate`**
    - Determines the frame rate to be enforced on the loaded video, allowing for consistent frame rate processing across videos.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_size`**
    - Allows specifying a desired resolution for the video, facilitating the standardization of video sizes for processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_width`**
    - Sets a custom width for the video, enabling precise control over the video's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`custom_height`**
    - Sets a custom height for the video, enabling precise control over the video's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_load_cap`**
    - Limits the number of frames to be loaded from the video, useful for processing videos within memory constraints.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`skip_first_frames`**
    - Skips a specified number of initial frames in the video, useful for starting processing at a later point in the video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_every_nth`**
    - Selects every nth frame from the video for loading, allowing for sparse sampling of video frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`meta_batch`**
    - Associates the loaded video with a specific batch for processing, facilitating batch operations within the Video Helper Suite.
    - Comfy dtype: `VHS_BatchManager`
    - Python dtype: `VHS_BatchManager`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The loaded video frames as images, ready for further processing.
    - Python dtype: `List[Image]`
- **`frame_count`**
    - Comfy dtype: `INT`
    - The total number of frames loaded from the video.
    - Python dtype: `int`
- **`audio`**
    - Comfy dtype: `VHS_AUDIO`
    - The audio track extracted from the video, if any.
    - Python dtype: `VHS_AUDIO`
- **`video_info`**
    - Comfy dtype: `VHS_VIDEOINFO`
    - Metadata and information about the loaded video.
    - Python dtype: `VHS_VIDEOINFO`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadVideoPath:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "video": ("STRING", {"default": "X://insert/path/here.mp4", "vhs_path_extensions": video_extensions}),
                "force_rate": ("INT", {"default": 0, "min": 0, "max": 60, "step": 1}),
                 "force_size": (["Disabled", "Custom Height", "Custom Width", "Custom", "256x?", "?x256", "256x256", "512x?", "?x512", "512x512"],),
                 "custom_width": ("INT", {"default": 512, "min": 0, "max": DIMMAX, "step": 8}),
                 "custom_height": ("INT", {"default": 512, "min": 0, "max": DIMMAX, "step": 8}),
                "frame_load_cap": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "skip_first_frames": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "select_every_nth": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1}),
            },
            "optional": {
                "meta_batch": ("VHS_BatchManager",)
            },
            "hidden": {
                "unique_id": "UNIQUE_ID"
            },
        }

    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"

    RETURN_TYPES = ("IMAGE", "INT", "VHS_AUDIO", "VHS_VIDEOINFO",)
    RETURN_NAMES = ("IMAGE", "frame_count", "audio", "video_info",)

    FUNCTION = "load_video"

    def load_video(self, **kwargs):
        if kwargs['video'] is None or validate_path(kwargs['video']) != True:
            raise Exception("video is not a valid path: " + kwargs['video'])
        return load_video_cv(**kwargs)

    @classmethod
    def IS_CHANGED(s, video, **kwargs):
        return hash_path(video)

    @classmethod
    def VALIDATE_INPUTS(s, video, **kwargs):
        return validate_path(video, allow_none=True)

```
