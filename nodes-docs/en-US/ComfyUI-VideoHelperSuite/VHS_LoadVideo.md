---
tags:
- Multimedia
- VideoHelperSuite
---

# Load Video (Upload) 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_LoadVideo`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_LoadVideo node is designed to facilitate the uploading and processing of video files within the Video Helper Suite. It handles the intricacies of loading video data from user uploads, ensuring compatibility and readiness for further processing or analysis within the suite.
## Input types
### Required
- **`video`**
    - Specifies the video file to be uploaded and processed. This parameter is crucial as it determines the video content that will undergo subsequent operations within the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`force_rate`**
    - Defines the frame rate to which the video should be forced, allowing control over playback speed and frame sampling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_size`**
    - Allows for the specification of a target size for the video, enabling resizing operations to adapt the video to certain dimensions or constraints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_width`**
    - Sets a specific width for the video when resizing, providing flexibility in adjusting video dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`custom_height`**
    - Sets a specific height for the video when resizing, offering control over the vertical dimension of the video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_load_cap`**
    - Limits the number of frames to be loaded from the video, useful for processing or analyzing only a portion of the video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`skip_first_frames`**
    - Skips a specified number of initial frames, useful for starting the processing at a later point in the video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_every_nth`**
    - Selects every nth frame from the video, enabling downsampling for efficiency or specific analysis needs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`meta_batch`**
    - Associates the video processing task with a specific batch manager, facilitating organized and efficient handling of multiple video processing tasks.
    - Comfy dtype: `VHS_BatchManager`
    - Python dtype: `VHS_BatchManager`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Represents the processed video frames, converted and ready for use within the suite's workflow.
    - Python dtype: `np.ndarray`
- **`frame_count`**
    - Comfy dtype: `INT`
    - Provides the total number of frames in the uploaded video, useful for indexing and processing operations.
    - Python dtype: `int`
- **`audio`**
    - Comfy dtype: `VHS_AUDIO`
    - Extracts and outputs the audio track from the uploaded video, allowing for separate audio processing or analysis.
    - Python dtype: `VHS_AUDIO`
- **`video_info`**
    - Comfy dtype: `VHS_VIDEOINFO`
    - Gathers and outputs detailed information about the video, such as dimensions and duration, essential for further processing steps.
    - Python dtype: `VHS_VIDEOINFO`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - [CannyEdgePreprocessor](../../comfyui_controlnet_aux/Nodes/CannyEdgePreprocessor.md)
    - [ImageScaleToTotalPixels](../../Comfy/Nodes/ImageScaleToTotalPixels.md)
    - [ImageResize+](../../ComfyUI_essentials/Nodes/ImageResize+.md)
    - [TilePreprocessor](../../comfyui_controlnet_aux/Nodes/TilePreprocessor.md)
    - [LineArtPreprocessor](../../comfyui_controlnet_aux/Nodes/LineArtPreprocessor.md)
    - [DWPreprocessor](../../comfyui_controlnet_aux/Nodes/DWPreprocessor.md)



## Source code
```python
class LoadVideoUpload:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = []
        for f in os.listdir(input_dir):
            if os.path.isfile(os.path.join(input_dir, f)):
                file_parts = f.split('.')
                if len(file_parts) > 1 and (file_parts[-1] in video_extensions):
                    files.append(f)
        return {"required": {
                    "video": (sorted(files),),
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
        kwargs['video'] = folder_paths.get_annotated_filepath(kwargs['video'].strip("\""))
        return load_video_cv(**kwargs)

    @classmethod
    def IS_CHANGED(s, video, **kwargs):
        image_path = folder_paths.get_annotated_filepath(video)
        return calculate_file_hash(image_path)

    @classmethod
    def VALIDATE_INPUTS(s, video, force_size, **kwargs):
        if not folder_paths.exists_annotated_filepath(video):
            return "Invalid video file: {}".format(video)
        return True

```
