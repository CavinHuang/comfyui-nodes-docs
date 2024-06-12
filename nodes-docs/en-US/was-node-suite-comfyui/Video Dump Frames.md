---
tags:
- Image
---

# Video Dump Frames
## Documentation
- Class name: `Video Dump Frames`
- Category: `WAS Suite/Animation`
- Output node: `False`

This node is designed to extract frames from a video file and save them as individual image files in a specified output directory. It leverages ffmpeg for frame extraction, providing options for naming conventions, output formats, and handling of video paths through token parsing. The node emphasizes flexibility in output customization and ensures compatibility with various video formats through ffmpeg integration.
## Input types
### Required
- **`video_path`**
    - Specifies the path to the video file from which frames will be extracted. This path is crucial as it determines the source video for frame dumping.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`output_path`**
    - Defines the destination directory where the extracted frames will be saved as image files. It supports token parsing for dynamic path resolution.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prefix`**
    - A prefix added to the filename of each extracted frame, allowing for customizable naming conventions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filenumber_digits`**
    - Specifies the number of digits to use for the frame numbering in the filenames, allowing for uniform filename lengths.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`extension`**
    - Determines the file format (e.g., png, jpg) of the extracted frames, enabling output format customization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`output_path`**
    - Comfy dtype: `STRING`
    - Returns the absolute path to the directory where the extracted frames have been saved.
    - Python dtype: `str`
- **`processed_count`**
    - Comfy dtype: `NUMBER`
    - Indicates the number of frames successfully extracted and saved from the video.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Video_Frame_Dump:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "video_path": ("STRING", {"default":"./ComfyUI/input/MyVideo.mp4", "multiline":False}),
                "output_path": ("STRING", {"default": "./ComfyUI/input/MyVideo", "multiline": False}),
                "prefix": ("STRING", {"default": "frame_", "multiline": False}),
                "filenumber_digits": ("INT", {"default":4, "min":-1, "max":8, "step":1}),
                "extension": (["png","jpg","gif","tiff"],),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = (TEXT_TYPE,"NUMBER")
    RETURN_NAMES = ("output_path","processed_count")
    FUNCTION = "dump_video_frames"

    CATEGORY = "WAS Suite/Animation"

    def dump_video_frames(self, video_path, output_path, prefix="fame_", extension="png",filenumber_digits=-1):

        conf = getSuiteConfig()
        if not conf.__contains__('ffmpeg_bin_path'):
            cstr(f"Unable to use dump frames because the `ffmpeg_bin_path` is not set in `{WAS_CONFIG_FILE}`").error.print()
            return ("",0)

        if conf.__contains__('ffmpeg_bin_path'):
            if conf['ffmpeg_bin_path'] != "/path/to/ffmpeg":
                sys.path.append(conf['ffmpeg_bin_path'])
                os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;udp"
                os.environ['OPENCV_FFMPEG_BINARY'] = conf['ffmpeg_bin_path']

        if output_path.strip() in [None, "", "."]:
            output_path = "./ComfyUI/input/frames"

        tokens = TextTokens()
        output_path = os.path.abspath(os.path.join(*tokens.parseTokens(output_path).split('/')))
        prefix = tokens.parseTokens(prefix)

        WTools = WAS_Tools_Class()
        MP4Writer = WTools.VideoWriter()
        processed = MP4Writer.extract(video_path, output_path, prefix, extension,filenumber_digits)

        return (output_path, processed)

```
