# Load Video (Path) 🎥🅥🅗🅢
## Documentation
- Class name: VHS_LoadVideoPath
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VHS_LoadVideoPath节点用于从指定路径加载视频文件，以便整合到视频处理工作流程中。它确保视频文件可访问，验证路径，并为视频的后续处理或分析任务做好准备。

## Input types
### Required
- video
    - 指定要加载的视频文件的路径，使节点能够访问和处理视频。
    - Comfy dtype: STRING
    - Python dtype: str
- force_rate
    - 决定对加载的视频强制执行的帧率，允许在不同视频之间进行一致的帧率处理。
    - Comfy dtype: INT
    - Python dtype: int
- force_size
    - 允许指定视频的所需分辨率，便于视频尺寸标准化处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- custom_width
    - 设置视频的自定义宽度，使对视频尺寸进行精确控制。
    - Comfy dtype: INT
    - Python dtype: int
- custom_height
    - 设置视频的自定义高度，使对视频尺寸进行精确控制。
    - Comfy dtype: INT
    - Python dtype: int
- frame_load_cap
    - 限制从视频中加载的帧数，有助于在内存约束内处理视频。
    - Comfy dtype: INT
    - Python dtype: int
- skip_first_frames
    - 跳过视频中的指定数量的初始帧，有助于在视频的后续部分开始处理。
    - Comfy dtype: INT
    - Python dtype: int
- select_every_nth
    - 选择每第n帧进行加载，允许对视频帧进行稀疏采样。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- meta_batch
    - 将加载的视频与特定批次关联，便于在视频助手套件中进行批处理操作。
    - Comfy dtype: VHS_BatchManager
    - Python dtype: VHS_BatchManager

## Output types
- IMAGE
    - Comfy dtype: IMAGE
    - 加载的视频帧作为图像，准备进一步处理。
    - Python dtype: List[Image]
- frame_count
    - Comfy dtype: INT
    - 从视频中加载的帧总数。
    - Python dtype: int
- audio
    - Comfy dtype: VHS_AUDIO
    - 从视频中提取的音轨（如果有）。
    - Python dtype: VHS_AUDIO
- video_info
    - Comfy dtype: VHS_VIDEOINFO
    - 有关加载视频的元数据和信息。
    - Python dtype: VHS_VIDEOINFO

## Usage tips
- Infra type: CPU
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