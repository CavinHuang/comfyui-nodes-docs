
# Documentation
- Class name: Frame Counter (Directory) [Dream]
- Category: ✨ Dream/🎥 animation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点旨在根据指定目录中找到的图像来计算帧数，匹配给定的模式，并按数字或字母顺序排列。它在需要跟踪帧进度的动画项目中特别有用。

# Input types
## Required
- directory_path
    - 指定包含要计数的图像的目录路径。此路径对于定位和处理图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- pattern
    - 定义用于匹配目录中文件的模式（例如，'*.jpg'）。此模式决定了哪些文件被纳入帧计数。
    - Comfy dtype: STRING
    - Python dtype: str
- indexing
    - 决定图像索引和计数的顺序，可以是数字顺序或字母顺序。这影响帧计数的顺序。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- total_frames
    - 设置要计数的最大帧数，为帧计数过程提供一个限制。
    - Comfy dtype: INT
    - Python dtype: int
- frames_per_second
    - 指定帧率，用于根据帧数计算动画的持续时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- frame_counter
    - 输出一个FrameCounter对象，封装当前帧计数、总帧数和每秒帧数。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamDirectoryBackedFrameCounter:
    NODE_NAME = "Frame Counter (Directory)"
    ICON = "⚋"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {"default": '', "multiline": False}),
                "pattern": ("STRING", {"default": '*', "multiline": False}),
                "indexing": (["numeric", "alphabetic order"],),
                "total_frames": ("INT", {"default": 100, "min": 2, "max": 24 * 3600 * 60}),
                "frames_per_second": ("INT", {"min": 1, "default": 30}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = (FrameCounter.ID,)
    RETURN_NAMES = ("frame_counter",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, directory_path, pattern, indexing, total_frames, frames_per_second):
        results = list_images_in_directory(directory_path, pattern, indexing == "alphabetic order")
        if not results:
            return (FrameCounter(0, total_frames, frames_per_second),)
        n = max(results.keys()) + 1
        return (FrameCounter(n, total_frames, frames_per_second),)

```
